import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Prices from '../screens/prices';
import Paiement from '../screens/paiement';
import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
import Confirmation from '../screens/confirmation';
import Login from '../screens/login';
import HomePage from '../screens/homePage';
import Event from '../screens/event';

let mainStack = createNativeStackNavigator();

let main = () => {
  return (
    <mainStack.Navigator
      initialRouteName="confirmation"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        header: ({navigation, route, options}) => {
          return (
            <View
              style={{
                position: 'absolute',
                zIndex: 1000,
                width: '100%',
                height: Dimensions.get('window').height / 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: 'white',
                paddingTop: '5%',
              }}>
              <View
                style={{
                  flexBasis: '50%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  top: '10%',
                  right: '10%',
                  backgroundColor: '#7371FC',
                  padding: '2%',
                  borderRadius: 5,
                  shadowColor: 'black',
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                  <Text
                    style={{
                      color:
                        route.name === 'home'
                          ? 'white'
                          : 'rgba(255,255,255,0.8)',
                      fontSize: 20,
                      fontFamily: 'Manrope-Regular',
                    }}>
                    Mon agenda ?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('prices')}>
                  <Text
                    style={{
                      color:
                        route.name === 'prices'
                          ? 'white'
                          : 'rgba(255,255,255,0.8)',
                      fontSize: 20,
                      fontFamily: 'Manrope-Regular',
                    }}>
                    Tarifs
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        },
      }}>
      <mainStack.Screen component={Home} name="home" />
      <mainStack.Screen component={Prices} name="prices" />
      <mainStack.Screen component={Paiement} name="paiement" />
      <mainStack.Screen component={Confirmation} name="confirmation" />
      <mainStack.Screen component={Login} name="login" />
    </mainStack.Navigator>
  );
};

export default main;
