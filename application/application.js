import {NavigationContainer} from '@react-navigation/native';
import Main from '../navigation/main';
import Connected from '../navigation/connected';
import React, {Component} from 'react';
import {connect, useDispatch} from 'react-redux';
import * as ACTIONS from '../reducer/actions';
import {Dimensions} from 'react-native';

export class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.orientationChange = this.orientationChange.bind(this);
  }

  orientationChange = () => {
    return Dimensions.get('window').height > Dimensions.get('window').width;
  };

  componentDidMount = async () => {
    this.props.ifAuth();

    Dimensions.addEventListener('change', () => {
      if (this.orientationChange()) {
        console.log('PORTRAIT');
        this.props.orientationChange('PORTRAIT');
      } else {
        console.log('LANDSCAPE');
        this.props.orientationChange('LANDSCAPE');
      }
    });
  };

  componentDidUpdate = async () => {
    this.props.ifAuth();
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <NavigationContainer independent={true}>
        {!this.props.token ? <Main /> : <Connected />}
      </NavigationContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    token: state.token,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    ifAuth: () => {
      dispatch(ACTIONS.cheickAuth());
    },
    orientationChange: data =>
      dispatch({type: 'change', payload: {data: data}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
