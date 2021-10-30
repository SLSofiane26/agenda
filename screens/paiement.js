import axios from 'axios';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {API_URL} from '@env';

class Paiement extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      firstNameb: false,
      lastName: null,
      lastNameb: false,
      email: null,
      emailB: false,
      password: null,
      confirmpassword: null,
      priceId: null,
      errorPassword: false,
      error: false,
      errorEmail: false,
      errorT: false,
      errorIdentification: false,
      passwordLength: false,
      errorAll: false,
      secret: true,
      secretBis: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  componentDidMount = () => {
    this.setState(prevState => ({
      ...this.state,
      priceId: this.props.route.params.data,
      date: this.props.route.params.date,
    }));
  };

  componentDidUpdate = () => {};

  componentWillUnmount = () => {};

  isValid = form => {
    let valid = true;
    Object.values(form).forEach(val => {
      if (!val) {
        valid = false;
      }
    });

    return valid;
  };

  d = null;

  re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  handleSubmit = async () => {
    let d = {};

    d.firstName = this.state.firstName;

    d.lastName = this.state.lastName;

    d.email = this.state.email;

    d.password = this.state.password;

    d.confirmpassword = this.state.confirmpassword;

    d.priceId = this.state.priceId;

    if (this.isValid(d)) {
      if (
        this.state.password.length > 5 &&
        this.state.password === this.state.confirmpassword &&
        this.re.test(this.state.email)
      ) {
        await axios({
          method: 'POST',
          url: `${API_URL}/register`,
          data: this.state,
          header: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            this.props.navigation.navigate('confirmation', {
              priceId: this.state.priceId,
              email: this.state.email,
              token: res.data.token,
            });
          })
          .catch(err => {
            this.setState(prevState => ({
              ...this.state,
              errorEmailIdentification: true,
            }));
          });
      } else {
        this.setState(prevState => ({
          ...this.state,
          error: true,
        }));
        setTimeout(() => {
          this.setState(prevState => ({
            ...this.state,
            error: false,
          }));
        }, 9000);
      }
    } else {
      this.setState(prevState => ({...this.state, errorT: true}));
      setTimeout(() => {
        this.setState(prevState => ({
          ...this.state,
          errorT: false,
        }));
      }, 9000);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          backgroundColor: 'white',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          blurRadius={2}
          source={require('../images/fond.png')}
          resizeMethod="auto"
          resizeMode="contain"
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        />
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '20%',
          }}>
          <View
            style={{
              flexBasis: '80%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: '10%',
            }}>
            {this.state.firstName && this.state.firstNameb ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#7371FC',
                    fontSize: 30,
                    fontFamily: 'Manrope-Regular',
                  }}>
                  {this.state.firstName}
                </Text>
                <TouchableOpacity
                  style={{paddingLeft: '10%'}}
                  onPress={() =>
                    this.setState(prevState => ({
                      ...this.state,
                      firstNameb: false,
                    }))
                  }>
                  <Icon name="close" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                style={style.inputBis}
                autoCapitalize="none"
                onEndEditing={() =>
                  this.setState(prevState => ({
                    ...this.state,
                    firstNameb: true,
                  }))
                }
                defaultValue={this.state.firstName}
                dataDetectorTypes="all"
                keyboardAppearance="light"
                textContentType="familyName"
                autoCompleteType="name"
                placeholder="Nom"
                placeholderTextColor="black"
                onChangeText={val =>
                  this.setState(prevState => ({
                    ...this.state,
                    firstName: val,
                  }))
                }
              />
            )}
          </View>
          <View
            style={{
              flexBasis: '80%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '10%',
            }}>
            {this.state.lastName && this.state.lastNameb ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#7371FC',
                    fontSize: 30,
                    fontFamily: 'Manrope-Regular',
                  }}>
                  {this.state.lastName}
                </Text>
                <TouchableOpacity
                  style={{paddingLeft: '10%'}}
                  onPress={() =>
                    this.setState(prevState => ({
                      ...this.state,
                      lastNameb: false,
                    }))
                  }>
                  <Icon name="close" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                autoCapitalize="none"
                style={style.inputBis}
                onEndEditing={() =>
                  this.setState(prevState => ({
                    ...this.state,
                    lastNameb: true,
                  }))
                }
                editable
                defaultValue={this.state.lastName}
                dataDetectorTypes="all"
                keyboardAppearance="light"
                textContentType="name"
                autoCompleteType="username"
                onChangeText={val =>
                  this.setState(prevState => ({
                    ...this.state,
                    lastName: val,
                  }))
                }
                placeholder="Prénom"
                placeholderTextColor="black"
              />
            )}
          </View>
          <View
            style={{
              flexBasis: '80%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '10%',
            }}>
            {this.state.email && this.state.emailB ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#7371FC',
                    fontSize: 20,
                    fontFamily: 'Manrope-Regular',
                  }}>
                  {this.state.email}
                </Text>
                <TouchableOpacity
                  style={{paddingLeft: '10%'}}
                  onPress={() =>
                    this.setState(prevState => ({
                      ...this.state,
                      emailB: false,
                    }))
                  }>
                  <Icon name="close" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                style={style.inputBis}
                autoCapitalize="none"
                onEndEditing={() =>
                  this.setState(prevState => ({
                    ...this.state,
                    emailB: true,
                  }))
                }
                editable
                defaultValue={this.state.email}
                dataDetectorTypes="all"
                keyboardAppearance="light"
                textContentType="emailAddress"
                autoCompleteType="email"
                onChangeText={val =>
                  this.setState(prevState => ({
                    ...this.state,
                    email: val,
                  }))
                }
                placeholder={
                  (this.state.error && !this.re.test(this.state.email)) ||
                  (this.state.errorT && !this.re.test(this.state.email))
                    ? 'Email invalide *'
                    : 'Email'
                }
                placeholderTextColor={
                  (this.state.error && !this.re.test(this.state.email)) ||
                  (this.state.errorT && !this.re.test(this.state.email))
                    ? '#FF3A20'
                    : 'black'
                }
              />
            )}
          </View>

          <View
            style={{
              flexBasis: '80%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <TextInput
              style={style.inputBis}
              defaultValue={this.state.password}
              editable
              secureTextEntry={this.state.secret}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="password"
              autoCompleteType="password"
              onChangeText={val =>
                this.setState(prevState => ({
                  ...this.state,
                  password: val,
                }))
              }
              placeholder={
                (this.state.errorT && !this.state.password) ||
                (this.state.error && this.state.password.length < 5)
                  ? '5 caractères minimum'
                  : 'Mot de passe'
              }
              placeholderTextColor={
                (this.state.errorT && !this.state.password) ||
                (this.state.error && this.state.password.length < 5)
                  ? '#FF3A20'
                  : 'black'
              }
            />
            <TouchableOpacity
              style={{top: '1%'}}
              onPress={() =>
                this.setState(prevState => ({
                  ...this.state,
                  secret: !prevState.secret,
                }))
              }>
              <Icon name="eyeo" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexBasis: '80%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '3%',
            }}>
            <TextInput
              style={style.inputBis}
              autoCapitalize="none"
              secureTextEntry={this.state.secretBis}
              defaultValue={this.state.confirmpassword}
              editable
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="newPassword"
              autoCompleteType="password"
              onChangeText={val =>
                this.setState(prevState => ({
                  ...this.state,
                  confirmpassword: val,
                }))
              }
              placeholder="Confirmez votre mot de passe"
              placeholderTextColor="black"
            />
            <TouchableOpacity
              style={{top: '1%'}}
              onPress={() =>
                this.setState(prevState => ({
                  ...this.state,
                  secretBis: !prevState.secretBis,
                }))
              }>
              <Icon name="eyeo" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexBasis: '80%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              style={{
                padding: '5%',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
                width: '50%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#7371FC',
                shadowColor: 'black',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Manrope-Regular',
                  color: 'white',
                  fontSize: 20,
                }}>
                Suivant
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.errorT && (
            <Text
              style={{
                fontFamily: 'Manrope-Regular',
                color: '#FF3A20',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Tous les champs doivent être remplis.
            </Text>
          )}
          {(this.state.error &&
            this.state.password &&
            this.state.password.length < 5) ||
            (this.state.errorT && !this.state.password && (
              <Text style={style.text}>
                Votre mot de passe doit contenir au moins 5 caractères.
              </Text>
            ))}
          {this.state.error &&
            this.state.confirmpassword !== this.state.password && (
              <Text style={style.text}>
                Les mots de passe ne sont pas identiques,veuillez à nouveau
                confirmer votre mot de passe.
              </Text>
            )}

          {this.state.errorIdentification && (
            <Text style={style.text}>
              L'adresse email saisie est déjà utilisée.
            </Text>
          )}

          {this.state.errorT && !this.state.email && (
            <Text style={style.text}>
              L'email renseignée n'est pas valide (veuillez inclure un '@').
            </Text>
          )}
          {this.state.errorT &&
            !this.re.test(this.state.email) &&
            this.state.email && (
              <Text style={style.text}>
                L'email renseignée n'est pas valide (veuillez inclure un '@').
              </Text>
            )}
          {this.state.error && !this.re.test(this.state.email) && (
            <Text style={style.text}>
              L'email renseignée n'est pas valide (veuillez inclure un '@').
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

let style = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    }),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontFamily: 'Manrope-Regular',
    color: '#FF3A20',
    textAlign: 'center',
    fontSize: 16,
    width: '70%',
  },
  inputBis: {
    height: 70,
    fontFamily: 'Manrope-Regular',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingLeft: '5%',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    fontSize: 15,
  },
});

export default connect(null, null)(Paiement);
