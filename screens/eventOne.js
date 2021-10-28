import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';

let eventOne = React.memo(function eventOne(props) {
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
          Date et heure de l'évènement :
        </Text>
        <DatePicker
          androidVariant="iosClone"
          mode="datetime"
          minuteInterval={15}
          minimumDate={new Date()}
          locale="fr-FR"
          open={true}
          date={props.date}
          style={{width: Dimensions.get('window').width, marginTop: '6%'}}
          onDateChange={props.onDateChange}
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

eventOne.propTypes = {
  date: PropTypes.object,
  onDateChange: PropTypes.func,
  onPress: PropTypes.func,
};

eventOne.defaultProps = {};

export default eventOne;
