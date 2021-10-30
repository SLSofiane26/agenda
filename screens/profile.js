import axios from 'axios';
import React, {PureComponent} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import * as ACTIONS from '../reducer/actions';

class Profil extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      age: null,
      adress: null,
      zipCode: null,
      phoneNumber: null,
      city: null,
    };
  }
  componentDidMount = () => {};

  componentDidUpdate = () => {};

  componentWillUnmount = () => {};

  handleSubmit = async () => {
    this.props.handleSubmit(this.state, this.props.tokenn);
    this.props.navigation.navigate('Mon espace');
  };

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: 'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginTop: '15%',
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
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="familyName"
              autoCompleteType="name"
              placeholder="Nom"
              placeholderTextColor="black"
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  lastName: val,
                }));
              }}
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="givenName"
              autoCompleteType="username"
              placeholder="Prénom"
              placeholderTextColor="black"
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  firstName: val,
                }));
              }}
            />

            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              keyboardType="number-pad"
              placeholder="Age"
              placeholderTextColor="black"
              style={style.input}
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  age: val,
                }));
              }}
            />

            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="addressCity"
              autoComplete="street-address"
              placeholder="Adresse postale"
              placeholderTextColor="black"
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  adress: val,
                }));
              }}
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              keyboardType="number-pad"
              textContentType="postalCode"
              autoComplete="postal-code"
              placeholder="Code postal"
              placeholderTextColor="black"
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  zipCode: val,
                }));
              }}
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="location"
              autoComplete="street-address"
              placeholder="Ville"
              placeholderTextColor="black"
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  city: val,
                }));
              }}
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="phoneNumber"
              keyboardAppearance="light"
              textContentType="telephoneNumber"
              autoCompleteType="tel"
              placeholder="Téléphone"
              placeholderTextColor="black"
              onChangeText={val => {
                this.setState(prevState => ({
                  ...this.state,
                  phoneNumber: val,
                }));
              }}
            />

            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              style={{
                padding: '4%',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
                width: '50%',
                marginTop: '10%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                shadowColor: 'black',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 10,
                backgroundColor: '#7371FC',
                marginBottom: '30%',
              }}>
              <Text
                style={{
                  fontFamily: 'Manrope-Regular',
                  color: 'white',
                  fontSize: 20,
                }}>
                Enregister
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

let mapStateToProps = state => {
  return {
    tokenn: state.token,
  };
};

let mapDispatchToProps = () => dispatch => {
  return {
    handleSubmit: (data, datab) =>
      dispatch(ACTIONS.modificationUser(data, datab)),
  };
};

let style = StyleSheet.create({
  input: {
    height: 70,
    fontFamily: 'Manrope-Regular',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingLeft: '5%',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    fontSize: 15,
    marginTop: '10%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
