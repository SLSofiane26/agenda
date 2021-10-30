import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Tts from 'react-native-tts';
import {connect} from 'react-redux';
import * as ACTION from '../reducer/actions';
import {mois, jourss} from './DATE';

class homePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      new: false,
      titre: null,
      dateBis: null,
      animTop: new Animated.Value(-450),
    };
  }

  componentDidMount = async () => {
    this.props.fetchUser(this.props.token);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.route.params) {
      if (
        this.state.dateBis != this.props.route.params.dataBis.date ||
        this.state.titre != this.props.route.params.dataBis.title
      ) {
        let an = new Date(this.props.route.params.dataBis.date).getFullYear();
        let moisz = new Date(this.props.route.params.dataBis.date).getMonth();
        let joursz = new Date(this.props.route.params.dataBis.date).getDate();

        let hours = new Date(this.props.route.params.dataBis.date).getHours();
        let minutes = new Date(
          this.props.route.params.dataBis.date,
        ).getMinutes();

        if (minutes < 10) {
          minutes = '0' + minutes;
        }

        Tts.speak(
          `${this.props.route.params.dataBis.title} le ${joursz} ${mois[moisz]} ${an} à ${hours} heures ${minutes} ajouté à votre agenda`,
          {
            iosVoiceId: 'com.apple.ttsbundle.Thomas-compact',
            rate: 0.5,
          },
        );

        Animated.sequence([
          Animated.timing(this.state.animTop, {
            toValue: -350,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: false,
          }),
          Animated.timing(this.state.animTop, {
            toValue: -700,
            duration: 500,
            delay: 6000,
            easing: Easing.bounce,
            useNativeDriver: false,
          }),
        ]).start();

        this.setState(prevState => ({
          ...this.state,
          new: true,
          titre: this.props.route.params.dataBis.title,
          dateBis: this.props.route.params.dataBis.date,
        }));
      }
    }
  };

  componentWillUnmount = () => {};

  render() {
    let month = new Date().getMonth();

    let jours = new Date().getDay();

    let date = this.state.date;
    let h = date.getHours();
    let m = date.getMinutes();
    let time = `${h}h${m}`;

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: '10%',
        }}>
        <Image
          blurRadius={2}
          source={require('../images/4.png')}
          resizeMode="contain"
          style={{
            ...StyleSheet.absoluteFill,
            width: '100%',
            height: '100%',
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '10%',
          }}>
          {this.state.new && (
            <Animated.View
              style={{
                position: 'absolute',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                width: '85%',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF3A20',
                  padding: '3%',
                  borderRadius: 10,
                  marginTop: this.state.animTop,
                  shadowColor: 'black',
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                }}>
                <Text style={style.text}>
                  Évènement ajouté à votre agenda !
                </Text>
                <Text style={style.text}>{this.state.titre}</Text>
                <Text style={style.text}>
                  Date :{' '}
                  {new Date(this.state.dateBis).toLocaleDateString('fr-FR')}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              fontFamily: 'Manrope-Light',
              textAlign: 'center',
              borderRadius: 25,
            }}>
            {jourss[jours]} {new Date().getDate()} {mois[month]}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              fontFamily: 'Manrope-Bold',
              textAlign: 'center',
              borderRadius: 25,
              marginTop: '4%',
            }}>
            Bonjour {this.props.nom} {this.props.prenom},
          </Text>

          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('Mon agenda')}>
            <Text
              style={{
                color: 'white',
                fontSize: 40,
                fontFamily: 'Manrope-Regular',
                textAlign: 'center',
                borderRadius: 20,
              }}>
              Mon agenda
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() =>
              this.props.navigation.navigate('Ajouter un évènement')
            }>
            <Text
              style={{
                color: 'white',
                fontSize: 40,
                fontFamily: 'Manrope-Regular',
                textAlign: 'center',
              }}>
              Ajouter un évènement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}
            style={style.button}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Manrope-Regular',
                textAlign: 'center',
              }}>
              Modifier mes informations
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

let style = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Manrope-Light',
    textAlign: 'center',
    borderRadius: 25,
  },
  button: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: '15%',
    padding: '5%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(115, 113, 252, 0.9)',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 10,
  },
});

let mapStateToProps = state => {
  return {
    token: state.token,
    nom: state.nom,
    prenom: state.prenom,
    email: state.email,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    fetchUser: data => dispatch(ACTION.user(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
