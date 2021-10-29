import PropTypes from 'prop-types';
import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

let modal = React.memo(function (props) {
  return props.event ? (
    <View
      style={{
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: '#7371FC',
          width: '90%',
          height: '50%',
          shadowColor: 'black',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 1,
          shadowRadius: 1,
          zIndex: 10,
          borderRadius: 20,
          transform: [{translateX: props.anim}],
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          onPress={props.onPress}
          name="closecircleo"
          size={40}
          color={'white'}
          style={{
            alignSelf: 'flex-end',
            marginRight: '5%',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontFamily: 'Manrope-Regular',
            fontSize: 25,
            marginTop: '5%',
          }}>
          {props.event.title}
        </Text>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Manrope-Regular',
            fontSize: 25,
          }}>
          {props.event.subtitle}
        </Text>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Manrope-Regular',
            fontSize: 25,
            marginTop: '3%',
          }}>
          {new Date(props.event.start).toLocaleDateString('fr')}
        </Text>
        <View
          style={{
            display: 'flex',
            width: '70%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'space-around',
              alignItems: 'center',
              marginTop: '3%',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Manrope-Regular',
                fontSize: 25,
              }}>
              {new Date(props.event.start).getHours() < 10
                ? `0${new Date(props.event.start).getHours()}`
                : new Date(props.event.start).getHours()}
              H
              {new Date(props.event.start).getMinutes() < 10
                ? `0${new Date(props.event.start).getMinutes()}`
                : new Date(props.event.start).getMinutes()}{' '}
              -{' '}
              {new Date(props.event.end).getHours() < 10
                ? `0${new Date(props.event.end).getHours()}`
                : new Date(props.event.end).getHours()}
              H
              {new Date(props.event.end).getMinutes() < 10
                ? `0${new Date(props.event.end).getMinutes()}`
                : new Date(props.event.end).getMinutes()}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.deleteEvent()}
          style={{
            backgroundColor: '#FF3A20',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            borderRadius: 10,
            marginTop: '5%',
            shadowOffset: {width: 2, height: 2},
            shadowColor: 'black',
            shadowOpacity: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Manrope-Regular',
              fontSize: 20,
              padding: 15,
            }}>
            Supprimer
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  ) : null;
});

modal.propTypes = {
  color: PropTypes.string,
  deleteEvent: PropTypes.func,
};

modal.defaultProps = {
  color: 'white',
};

export default modal;
