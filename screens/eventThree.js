import React from 'react';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/AntDesign';

let eventThree = React.memo(function eventOne(props) {
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
      <TouchableOpacity onPress={props.onPressBis} style={{marginTop: '10%'}}>
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
          Commentaire(s) :
        </Text>
        <TextInput
          onChangeText={props.onChangeText}
          numberOfLines={10}
          multiline={true}
          defaultValue={props.defaultValue}
          placeholder="Commentaire(s)"
          style={{
            width: '80%',
            height: '30%',
            borderColor: 'black',
            borderWidth: 1,
            paddingLeft: '4%',
            marginTop: '6%',
            paddingTop: '4%',
            color: 'black',
            fontSize: 15,
            fontFamily: 'Manrope-Regular',
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            width: '50%',
            backgroundColor: '#7371FC',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '15%',
            borderRadius: 10,
            marginTop: '5%',
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
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

eventThree.PropTypes = {
  onChangeText: PropTypes.func,
  onPress: PropTypes.func,
};

eventThree.defaultProps = {};

export default eventThree;
