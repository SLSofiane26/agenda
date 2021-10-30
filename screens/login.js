import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import {useDispatch} from 'react-redux';
import * as ACTIONS from '../reducer/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconb from 'react-native-vector-icons/AntDesign';
import TouchID from 'react-native-touch-id';

let login = React.memo(function login(props) {
  let dispatch = useDispatch();

  let [form, setForm] = useState({
    email: null,
    password: null,
  });

  let [formBis, setFormBis] = useState({
    email: false,
    password: false,
  });

  let [secret, setSecret] = useState(true);

  let [error, setError] = useState(false);

  let [biometry, setBiometry] = useState(null);

  let [errorIdentification, setErrorIdentification] = useState(false);

  let isValid = form => {
    let valid = true;
    Object.values(form).forEach(val => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  };

  useEffect(() => {
    let optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          setBiometry('face');
        } else {
          setBiometry('id');
        }
      })
      .catch(error => {
        setBiometry('dsds');
      });
  }, []);

  let re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let handleSubmit = async () => {
    if (isValid(form) && re.test(form.email)) {
      await axios({
        method: 'POST',
        url: `${API_URL}/auth`,
        data: form,
      })
        .then(res => {
          dispatch(ACTIONS.login(res.data));
        })
        .catch(err => {
          setErrorIdentification(true);
          setError(false);
          setTimeout(() => {
            setErrorIdentification(!errorIdentification);
          }, 9000);
        });
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }
  };

  let handleSubmitBis = async () => {
    await TouchID.authenticate()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={style.container}>
      <Image
        blurRadius={3}
        source={require('../images/2.png')}
        resizeMode="contain"
        style={{
          ...StyleSheet.absoluteFillObject,
          width: '100%',
          height: '100%',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: '15%',
        }}>
        <Animated.Text
          style={{
            color: 'black',
            fontSize: 30,
            textTransform: 'uppercase',
            fontFamily: 'Manrope-Regular',
            padding: '5%',
            backgroundColor: 'rgba(255,255,255,0.4)',
          }}>
          Mon Agenda Mobile
        </Animated.Text>
        <View
          style={{
            flexBasis: '80%',
            padding: 0,
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          {form.email && formBis.email ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                backgroundColor: 'white',
                padding: '5%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#7371FC',
                  fontSize: 20,
                  fontFamily: 'Manrope-Regular',
                }}>
                {form.email}
              </Text>
              <TouchableOpacity
                style={{paddingLeft: '10%'}}
                onPress={() => setFormBis({...formBis, email: false})}>
                <Iconb name="close" size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <TextInput
              style={{
                height: 70,
                fontFamily: 'Manrope-Regular',
                borderWidth: 1,
                borderColor: 'black',
                width: '100%',
                paddingLeft: '5%',
                borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,1)',
                fontSize: 15,
                marginTop: '5%',
              }}
              autoCapitalize="none"
              onEndEditing={() => setFormBis({...formBis, email: true})}
              defaultValue={form.email}
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="emailAddress"
              autoCompleteType="email"
              placeholder={
                error && !re.test(form.email) ? 'Email invalide *' : 'Email'
              }
              placeholderTextColor={
                error && !re.test(form.email) ? 'red' : 'black'
              }
              onChangeText={val => setForm({...form, email: val})}
            />
          )}
        </View>

        <View
          style={{
            flexBasis: '80%',
            padding: 0,
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TextInput
            style={{
              height: 70,
              fontFamily: 'Manrope-Regular',
              borderWidth: 1,
              borderColor: 'black',
              width: '100%',
              paddingLeft: '5%',
              borderRadius: 10,
              backgroundColor: 'rgba(255,255,255,1)',
              fontSize: 15,
            }}
            autoCapitalize="none"
            defaultValue={form.password}
            dataDetectorTypes="all"
            secureTextEntry={secret}
            keyboardAppearance="light"
            textContentType="password"
            placeholder="Mot de passe"
            placeholderTextColor="black"
            onChangeText={val => setForm({...form, password: val})}
          />
          <TouchableOpacity
            onPress={() => setSecret(!secret)}
            style={{top: '1%'}}>
            <Iconb name="eyeo" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexBasis: '80%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              padding: '4%',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
              width: '50%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              shadowColor: 'black',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 10,
              backgroundColor: '#7371FC',
            }}>
            <Text
              style={{
                fontFamily: 'Manrope-Regular',
                color: 'white',
                fontSize: 20,
              }}>
              Se connecter
            </Text>
          </TouchableOpacity>

          {biometry && (
            <TouchableOpacity onPress={() => handleSubmitBis()} style={{}}>
              <Icon name="finger-print" size={100} />
            </TouchableOpacity>
          )}
        </View>
        {error && !re.test(form.email) && (
          <Text
            style={{
              fontFamily: 'Manrope-Regular',
              color: '#FF3A20',
              textAlign: 'center',
              fontSize: 16,
              width: '70%',
              backgroundColor: 'rgba(255,255,255,1)',
              padding: 6,
              marginTop: '3%',
            }}>
            *L'email renseignée n'est pas valide (veuillez inclure un '@').
          </Text>
        )}
        {error && !re.test(form.email) && (
          <Text style={style.error}>Tous les champs doivent être remplis.</Text>
        )}
        {errorIdentification && (
          <Text style={style.error}>Identifiants inconnus</Text>
        )}
      </ScrollView>
    </View>
  );
});

let style = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
      },
    }),
  },
  error: {
    fontFamily: 'Manrope-Regular',
    color: '#FF3A20',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 6,
    fontSize: 16,
  },
});

export default login;
