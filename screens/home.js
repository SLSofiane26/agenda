import React, {PureComponent} from 'react';
import {
  Animated,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      positionText: new Animated.ValueXY({x: -500, y: 0}),
    };
  }

  componentDidMount = () => {
    Animated.parallel([
      Animated.spring(this.state.positionText.x, {
        toValue: 70,
        bounciness: 0.004,
        speed: 0.0005,
        delay: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  componentDidUpdate = () => {};

  componentWillUnmount = () => {};

  render() {
    return (
      <Animated.View style={{...style.container, backgroundColor: 'white'}}>
        <Image
          blurRadius={2}
          source={require('../images/2.jpeg')}
          resizeMode="contain"
          style={{
            ...StyleSheet.absoluteFill,
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            flexBasis: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: '14%',
          }}>
          <Animated.Text
            style={{
              color: 'black',
              fontSize: 30,
              top: this.state.positionText.x,
              textTransform: 'uppercase',
              fontFamily: 'Manrope-Regular',
              padding: '5%',
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
            }}>
            Mon Agenda Mobile
          </Animated.Text>
          <View
            style={{
              marginTop: '28%',
              padding: '4%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Manrope-Light',
                fontSize: 25,
              }}>
              Planifier vos évènemements important et recevez une notification
              15 minutes avant.
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexBasis: '100%',
            alignContent: 'center',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexBasis: '100%',
              alignContent: 'center',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={style.input}
                onPress={() => this.props.navigation.navigate('login')}>
                <Text style={style.text}>Connexion</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={style.input}
                onPress={() => this.props.navigation.navigate('prices')}>
                <Text style={style.text}>Abonnement</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '5%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: 'Manrope-ExtraLight',
            }}>
            Application à destination des personnes malvoyantes ou
            malentendantes
          </Text>
          <Animated.Image
            source={require('../images/log.png')}
            style={{
              width: 100,
              height: 50,
              marginTop: 10,
            }}
          />
        </View>
      </Animated.View>
    );
  }
}

let style = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    }),
  },
  input: {
    padding: '5%',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Manrope-Light',
  },
});

export default Home;
