import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';

let eventTwo = React.memo(function eventOne(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={props.onPressBis}>
        <Icon name="arrowleft" size={50} />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            fontFamily: 'Manrope-Regular',
          }}>
          Titre de l'évènement :
        </Text>
        <TextInput
          placeholder="Titre"
          onChangeText={props.onChangeText}
          defaultValue={props.defaultValue}
          style={{
            width: '80%',
            height: '20%',
            borderColor: 'black',
            borderWidth: 1,
            paddingLeft: '4%',
            marginTop: '6%',
            color: 'black',
            fontSize: 15,
            fontFamily: 'Manrope-Regular',
            borderRadius: 10,
          }}
        />
        {props.error && (
          <Text
            style={{
              fontFamily: 'Manrope-Regular',
              color: 'red',
              fontSize: 16,
              top: 10,
            }}>
            Le titre de l'évènement est obligatoire.
          </Text>
        )}
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            width: '50%',
            backgroundColor: '#7371FC',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '17%',
            borderRadius: 10,
            marginTop: '5%',
            shadowColor: 'black',
            shadowOffset: {width: 3, height: 3},
            shadowOpacity: 10,
            borderColor: 'black',
            borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Manrope-Regular',
              color: 'white',
            }}>
            Suivant
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

eventTwo.PropTypes = {
  onChangeText: PropTypes.func,
  onPress: PropTypes.func,
};

eventTwo.defaultProps = {};

export default eventTwo;
