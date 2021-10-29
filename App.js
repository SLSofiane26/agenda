import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import Application from './application/application';
import Reducer from './reducer/reducer.js';

let store = createStore(Reducer, applyMiddleware(thunk));

let App = () => {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
};

export default App;
