import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {API_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import * as ACTIONS from '../reducer/actions';
import EventOne from './eventOne';
import EventTwo from './eventTwo';
import EventThree from './eventThree';
import EventFinal from './eventFinal';

let event = React.memo(function event(props) {
  let [form, setForm] = useState({
    title: null,
    body: null,
    date: new Date(),
  });

  let [one, setOne] = useState(false);

  let [two, setTwo] = useState(false);

  let [three, setThree] = useState(false);

  let [error, setError] = useState(false);

  let token = useSelector(state => state.token);

  let dispatch = useDispatch();

  let handleChange = data => {
    setForm({...form, date: data});
  };

  let handleSubmit = async () => {
    if (form.title) {
      let d = {};
      d.title = form.title;
      d.body = form.body;
      d.date = new Date(form.date).getTime();
      await axios({
        method: 'POST',
        url: `${API_URL}/event`,
        data: d,
        headers: {
          'x-auth-token': token,
        },
      }).then(res => {
        setOne(false);
        setTwo(false);
        setThree(false);
        setError(false);
        setForm({...form, title: null, body: null, date: new Date()});
        props.navigation.navigate('Mon espace', {
          data: true,
          dataBis: res.data,
        });
      });
    } else {
      setError(true);
    }
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={100}>
      {!one && (
        <EventOne
          onDateChange={data => handleChange(data)}
          date={form.date}
          onPress={() => setOne(true)}
        />
      )}
      {one && !two && (
        <EventTwo
          onChangeText={val => {
            setForm({...form, title: val});
          }}
          error={error}
          onPress={() => (form.title ? setTwo(true) : setError(true))}
          onPressBis={() => setOne(false)}
          defaultValue={form.title}
        />
      )}
      {one && two && !three && (
        <EventThree
          onChangeText={val => {
            setForm({...form, body: val});
          }}
          defaultValue={form.body}
          onPress={() => setThree(true)}
          onPressBis={() => setTwo(false)}
        />
      )}

      {one && two && three && (
        <EventFinal
          onPress={() => handleSubmit()}
          onPressBis={() => setThree(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
});

export default event;
