import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ACTIONS from '../reducer/actions';

let logout = React.memo(function logout(props) {
  let dispatch = useDispatch();
  useEffect(async () => {
    await AsyncStorage.clear();
    dispatch(ACTIONS.logout());
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontFamily: 'Manrope-Bold',
          color: 'black',
          fontSize: 30,
        }}>
        Déconnexion
      </Text>
    </SafeAreaView>
  );
});

logout.propTypes = {};

logout.defaultProps = {};

export default logout;
