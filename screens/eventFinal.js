import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';

let eventFinal = React.memo(function eventFinal(props) {
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
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            width: '80%',
            backgroundColor: '#7371FC',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '30%',
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
              fontSize: 30,
              fontFamily: 'Manrope-Regular',
              color: props.color,
            }}>
            Ajouter l'évènement
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

eventFinal.PropTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
};

eventFinal.defaultProps = {
  color: 'white',
};

export default eventFinal;
