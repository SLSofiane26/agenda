import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as ACTIONS from '../reducer/actions';

let confirmation = React.memo(function confirmation(props) {
  let [data, setData] = useState(null);

  let route = props.route.params;

  let dispatch = useDispatch();

  useEffect(() => {
    setData(route.data);
  }, []);

  let handleSubmit = async () => {
    await axios({
      method: 'POST',
      url: `${API_URL}/register`,
      data: d,
    }).then(res => {
      dispatch(ACTIONS.register(data));
    });
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 50, color: 'black'}}>Paiment</Text>
    </View>
  );
});

export default confirmation;
