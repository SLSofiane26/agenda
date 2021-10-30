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

class Profil extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};

  componentDidUpdate = () => {};

  componentWillUnmount = () => {};

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
              placeholder="Age"
              placeholderTextColor="black"
              style={style.input}
            />

            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              placeholder="Genre"
              placeholderTextColor="black"
              style={style.input}
            />

            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="familyName"
              autoCompleteType="name"
              placeholder="Nom"
              placeholderTextColor="black"
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
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="familyName"
              autoCompleteType="email"
              placeholder="Email"
              placeholderTextColor="black"
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="emailAddress"
              autoCompleteType="email"
              placeholder="Adresse postale"
              placeholderTextColor="black"
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="familyName"
              autoCompleteType="name"
              placeholder="Code postal"
              placeholderTextColor="black"
            />
            <TextInput
              style={style.input}
              autoCapitalize="none"
              dataDetectorTypes="all"
              keyboardAppearance="light"
              textContentType="familyName"
              autoCompleteType="name"
              placeholder="Ville"
              placeholderTextColor="black"
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
            />

            <TouchableOpacity
              onPress={() => console.log('hello')}
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
  return {};
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
