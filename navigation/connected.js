import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import HomePage from '../screens/homePage';
import Event from '../screens/event';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import {DrawerActions} from '@react-navigation/routers';
import Agendab from '../screens/agenda';
import Profile from '../screens/profile';
import Logout from '../screens/logout';

let connectedStack = createNativeStackNavigator();

let drawerNav = createDrawerNavigator();

let main = () => {
  return (
    <drawerNav.Navigator
      initialRouteName="Mon espace"
      screenOptions={{
        drawerType: 'front',
        headerShown: true,
        headerTransparent: true,
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#7371FC',
        drawerInactiveTintColor: 'black',
        drawerInactiveBackgroundColor: 'white',
        drawerStyle: {backgroundColor: 'transparent', width: '100%'},
        drawerLabelStyle: {
          fontSize: 20,
          fontFamily: 'Manrope-Regular',
          textAlign: 'center',
          borderRadius: 20,
        },
        header: ({navigation, route, options}) => {
          return (
            <View
              style={{
                zIndex: 1000,
                width: '100%',
                height: Dimensions.get('window').height / 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingTop: '5%',
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flexBasis: '60%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  backgroundColor: '#7371FC',
                  padding: '2%',
                  borderRadius: 5,
                  shadowColor: 'black',
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  top: '10%',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Mon espace')}>
                  <Text
                    style={{
                      color:
                        route.name === 'Mon espace'
                          ? 'white'
                          : 'rgba(255,255,255,0.8)',
                      fontSize: 20,
                      fontFamily: 'Manrope-Regular',
                    }}>
                    Espace
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Mon agenda', {data: true})
                  }>
                  <Text
                    style={{
                      color:
                        route.name === 'Mon agenda'
                          ? 'white'
                          : 'rgba(255,255,255,0.8)',
                      fontSize: 20,
                      fontFamily: 'Manrope-Regular',
                    }}>
                    Agenda
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Ajouter un évènement')}>
                  <Text
                    style={{
                      color:
                        route.name === 'Ajouter un évènement'
                          ? 'white'
                          : 'rgba(255,255,255,0.8)',
                      fontSize: 20,
                      fontFamily: 'Manrope-Regular',
                    }}>
                    Ajouter
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  marginLeft: '20%',
                  marginTop: '4%',
                }}
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                <Icon name="bars" size={50} color="#7371FC" />
              </TouchableOpacity>
            </View>
          );
        },
      }}>
      <connectedStack.Screen component={HomePage} name="Mon espace" />
      <connectedStack.Screen component={Event} name="Ajouter un évènement" />
      <connectedStack.Screen component={Agendab} name="Mon agenda" />
      <connectedStack.Screen component={Profile} name="Profile" />
      <connectedStack.Screen component={Logout} name="Déconnexion" />
    </drawerNav.Navigator>
  );
};

export default main;
