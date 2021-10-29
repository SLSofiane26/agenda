import axios from 'axios';
import React, {PureComponent} from 'react';
import {View, Animated, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import RNSchedule from 'rnschedule';
import {API_URL} from '@env';
import {Easing} from 'react-native-reanimated';
import Tts from 'react-native-tts';
import {mois, jourss} from './DATE';
import Modal from './Modal.js';

class Agenda extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      event: null,
      dateBis: new Date(),
      f: [],
      anim: new Animated.Value(1200),
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleEventBack = this.handleEventBack.bind(this);
  }

  componentDidMount = async () => {
    await axios({
      method: 'GET',
      url: `${API_URL}/event`,
      headers: {
        'x-auth-token': JSON.parse(this.props.tokenn),
      },
    }).then(res => {
      this.setState(prevState => ({
        ...this.state,
        data: res.data.event,
      }));
    });

    let f = [];

    this.state.data.map((items, index) => {
      let an = Number(new Date(items.date).getFullYear());
      let mois = Number(new Date(items.date).getMonth());
      let jours = Number(new Date(items.date).getDate());
      let hours = Number(new Date(items.date).getHours());
      let minute = Number(new Date(items.date).getMinutes());

      let startDate = new Date(an, mois, jours, hours, minute);

      let endDate = new Date(an, mois, jours, hours + 1, minute);

      f.push({
        title: items.title,
        subtitle: items.body,
        start: startDate,
        end: endDate,
        color: '#7371FC',
        id: items._id,
      });
    });
    this.setState(prevState => ({
      ...this.state,
      f: f,
    }));
  };

  componentDidUpdate = async (prevProps, prevState) => {
    await axios({
      method: 'GET',
      url: `${API_URL}/event`,
      headers: {
        'x-auth-token': JSON.parse(this.props.tokenn),
      },
    }).then(res => {
      if (res.data.event.length != this.state.data.length) {
        console.log('MAX');
        this.setState(prevState => ({
          ...this.state,
          data: res.data.event,
        }));
        let f = [];

        this.state.data.map((items, index) => {
          let an = Number(new Date(items.date).getFullYear());
          let mois = Number(new Date(items.date).getMonth());
          let jours = Number(new Date(items.date).getDate());
          let hours = Number(new Date(items.date).getHours());
          let minute = Number(new Date(items.date).getMinutes());

          let startDate = new Date(an, mois, jours, hours, minute);

          let endDate = new Date(an, mois, jours, hours + 1, minute);

          f.push({
            title: items.title,
            subtitle: items.body,
            start: startDate,
            end: endDate,
            color: '#7371FC',
            id: items._id,
          });
        });
        this.setState(prevState => ({
          ...this.state,
          f: f,
        }));
      } else {
        console.log('SAME');
      }
    });
  };

  componentWillUnmount = () => {
    Tts.removeEventListener('tts-cancel');
    Tts.removeEventListener('tts-finish');
    Tts.removeEventListener('tts-error');
    Tts.removeEventListener('tts-start');
  };

  handleEventBack = () => {
    Animated.timing(this.state.anim, {
      toValue: 500,
      easing: Easing.linear,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      this.setState(prevState => ({...this.state, event: null}));
    }, 1000);
  };

  handleEvent = event => {
    this.setState(prevState => ({
      ...this.state,
      event: event,
      dateBis: new Date(event.start),
    }));
    Animated.timing(this.state.anim, {
      toValue: 0,
      easing: Easing.linear,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  handleDelete = async () => {
    Tts.stop();
    await axios({
      method: 'DELETE',
      url: `${API_URL}/event/${this.state.event.id}`,
      headers: {
        'x-auth-token': this.props.tokenn,
      },
    }).then(res => {
      this.setState(prevState => ({
        ...this.state,
        data: res.data.event,
        event: null,
      }));
      let f = [];

      this.state.data.map((items, index) => {
        let an = Number(new Date(items.date).getFullYear());
        let mois = Number(new Date(items.date).getMonth());
        let jours = Number(new Date(items.date).getDate());
        let hours = Number(new Date(items.date).getHours());
        let minute = Number(new Date(items.date).getMinutes());

        let startDate = new Date(an, mois, jours, hours, minute);

        let endDate = new Date(an, mois, jours, hours + 1, minute);

        f.push({
          title: items.title,
          subtitle: items.body,
          start: startDate,
          end: endDate,
          color: '#7371FC',
          id: items._id,
        });
      });
      this.setState(prevState => ({
        ...this.state,
        f: f,
      }));
    });
  };

  render() {
    if (this.state.event) {
      let an = new Date(this.state.event.start).getFullYear();
      let moisz = new Date(this.state.event.start).getMonth();
      let joursz = new Date(this.state.event.start).getDate();

      let hours = new Date(this.state.event.start).getHours();
      let minutes = new Date(this.state.event.start).getMinutes();

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      Tts.speak(
        `${this.state.event.title} le ${joursz} ${mois[moisz]} ${an} à ${hours} heures ${minutes}`,
        {
          iosVoiceId: 'com.apple.ttsbundle.Thomas-compact',
          rate: 0.5,
        },
      );
    }

    Tts.addEventListener('tts-progress', () => {});
    Tts.addEventListener('tts-start', () => {});
    Tts.addEventListener('tts-cancel', () => {});
    Tts.addEventListener('tts-finish', () => {});

    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Modal
          onPress={() => this.handleEventBack()}
          event={this.state.event}
          anim={this.state.anim}
          deleteEvent={() => this.handleDelete()}
        />
        <View
          style={{
            width: '100%',
            marginTop: '0%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          <RNSchedule
            ok={this.state.dateBis}
            data={this.state.f}
            dataArray={this.state.f}
            onEventPress={event => {
              this.handleEvent(event);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

let mapStateToProps = state => {
  return {
    tokenn: state.token,
  };
};

export default connect(mapStateToProps, null)(Agenda);
