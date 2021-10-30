import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {API_URL} from '@env';

export let cheickAuth = () => async dispatch => {
  let token = await AsyncStorage.getItem('token');

  if (JSON.parse(token)) {
    dispatch({type: 'login', payload: {token: token}});
  } else {
    dispatch({type: 'logout'});
  }
};

export let login = data => async dispatch => {
  await AsyncStorage.setItem('token', JSON.stringify(data.token));
  dispatch({type: 'login', payload: {token: data.token}});
};

export let user = data => async dispatch => {
  await axios({
    method: 'GET',
    url: `${API_URL}/user`,
    headers: {
      'x-auth-token': JSON.parse(data),
    },
  }).then(res => dispatch({type: 'user', payload: {data: res.data}}));
};

export let logout = () => async dispatch => {
  dispatch({type: 'logout'});
};

export let register = (data, dataTwo) => async dispatch => {
  await axios({
    method: 'PUT',
    url: `${API_URL}/user`,
    headers: {'x-auth-token': data},
    data: dataTwo,
  }).then(async res => {
    await AsyncStorage.setItem('token', JSON.stringify(data));
    dispatch({type: 'register', payload: {token: data}});
  });
};

export let modificationUser = (data, datab) => async dispatch => {
  await axios({
    method: 'PUT',
    url: `${API_URL}/userb`,
    data: data,
    headers: {
      'x-auth-token': JSON.parse(datab),
      'Content-Type': 'application/json',
    },
  });
};
