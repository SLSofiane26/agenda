import React, {useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

let prices = props => {
  let [price, setPrice] = useState([
    {
      id: 2,
      title: 'Abonnement mensuel',
      desc: "En choissisant l'abonnement mensuel, profitez de toutes les fonctionnalités de l'application.",
      price: '10 € TTC / mois',
      priceId: 'price_1JpdjTKFhUTtY2eIsoR0Bf7W',
    },
    {
      id: 3,
      title: 'Abonnement annuel',
      desc: "En choissisant l'abonnement annuel, profitez de toutes les fonctionnalités de l'application à prix réduit.",
      price: '96 € TTC / an',
      priceId: 'price_1JpdjlKFhUTtY2eI05ojDCU7',
    },
  ]);

  let renderData = item => {
    return (
      <View
        key={item.item.id}
        style={{
          width: Dimensions.get('window').width,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '15%',
        }}>
        <View
          style={{
            flexBasis: '40%',
            borderWidth: 1,
            borderColor: 'black',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
            height: 100,
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}>
          <Text
            style={{color: 'black', fontFamily: 'Manrope-Bold', fontSize: 30}}>
            {item.item.title}
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Manrope-Regular',
              fontSize: 25,
              padding: '5%',
              textAlign: 'center',
            }}>
            {item.item.desc}
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Manrope-Regular',
              textDecorationLine: 'underline',
              fontSize: 30,
            }}>
            {item.item.price}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('paiement', {
              data: item.item.priceId,
            })
          }
          style={{
            borderColor: 'black',
            borderWidth: 1,
            padding: '2%',
            marginTop: '4%',
            borderRadius: 10,
            backgroundColor: '#7371FC',
            shadowColor: 'black',
            shadowOffset: {width: 3, height: 3},
            shadowOpacity: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Manrope-Regular',
              fontSize: 30,
            }}>
            Souscrire
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={style.container}>
      <Image
        blurRadius={3}
        source={require('../images/2.png')}
        resizeMode="contain"
        style={{
          ...StyleSheet.absoluteFill,
          width: '100%',
          height: '100%',
        }}
      />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={price}
        renderItem={renderData}
        keyExtractor={(index, item) => {
          return index.toString();
        }}
        horizontal
      />
    </View>
  );
};

let style = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
      },
    }),
  },
});

export default prices;
