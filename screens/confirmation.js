import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import * as ACTIONS from '../reducer/actions';
import {
  CardField,
  StripeProvider,
  createPaymentMethod,
  confirmPayment,
} from '@stripe/stripe-react-native';
import {API_URL} from '@env';

let confirmation = React.memo(function confirmation(props) {
  let [data, setData] = useState(null);

  let [card, setCard] = useState({
    brand: null,
    complete: false,
    expiryMonth: null,
    expiryYear: null,
    last4: null,
  });

  return (
    <StripeProvider
      publishableKey={
        ' sk_test_51JlEeSKFhUTtY2eIZVCwrKCnMxf7QLCK2E2242Gr2SchFOUevzpkImaPY9LIQGetHAfJr7YaVYDM1jINIuKyilhB00N7CBBDr5'
      }
      merchantIdentifier="merchant.identifier">
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <CardField
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          postalCodeEnabled={false}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
            borderColor: 'black',
            borderWidth: 1,
          }}
          onCardChange={cardDetails => {
            setCard(cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />

        <TouchableOpacity
          onPress={() => handleSubmitSub()}
          style={{
            padding: '4%',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            width: '50%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 10,
            backgroundColor: '#7371FC',
          }}>
          <Text
            style={{
              fontFamily: 'Manrope-Regular',
              color: 'white',
              fontSize: 20,
            }}>
            Payer
          </Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
});

export default confirmation;
