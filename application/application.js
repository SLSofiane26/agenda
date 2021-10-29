import {NavigationContainer} from '@react-navigation/native';
import Main from '../navigation/main';
import Connected from '../navigation/connected';
import React, {Component} from 'react';
import {connect, useDispatch} from 'react-redux';
import * as ACTIONS from '../reducer/actions';

export class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    this.props.ifAuth();
  };

  componentDidUpdate = async () => {
    this.props.ifAuth();
  };

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
