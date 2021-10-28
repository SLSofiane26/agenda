import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {API_URL} from '@env';

export let cheickAuth = () => async dispatch => {
  let token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({type: 'login', payload: {token: token}});
  } else {
    dispatch({type: 'logout'});
  }
};

export let register = data => async dispatch => {
  let token = await AsyncStorage.setItem('token', data.token);

  dispatch({type: 'register', payload: {token: data.token}});
};

export let login = data => async dispatch => {
  let token = await AsyncStorage.setItem('token', data.token);
  dispatch({type: 'login', payload: {token: data.token}});
};

export let user = data => async dispatch => {
  await axios({
    method: 'GET',
    url: `${API_URL}/user`,
    headers: {
      'x-auth-token': data,
    },
  }).then(res => dispatch({type: 'user', payload: {data: res.data}}));
};
