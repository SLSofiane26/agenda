import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  CardField,
  confirmPayment,
  StripeContainer,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import {API_URL} from '@env';
import {useDispatch} from 'react-redux';
import * as ACTIONS from '../reducer/actions';
import Spinner from 'react-native-spinkit';

let confirmation = React.memo(function confirmation(props) {
  let [data, setData] = useState(null);

  let [publishableKey, setPublishableKey] = useState('');

  let [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  let fetchPublishableKey = async () => {
    let key = await (await axios.get(`${API_URL}/key`)).data;
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  let {route} = props;

  let stripe = useStripe();

  let [card, setCard] = useState({
    brand: null,
    complete: false,
    expiryMonth: null,
    expiryYear: null,
    last4: null,
  });

  let handleSubmitSub = async () => {
    setLoading(true);
    if (!stripe) {
      return;
    }

    let result = await stripe.createPaymentMethod({
      type: 'Card',
      card: card,
      billing_details: {
        email: route.params.email,
      },
    });

    if (result.error) {
    } else {
      let d = {};
      d.payment_method = result.paymentMethod.id;
      d.email = route.params.email;
      d.priceId = route.params.priceId;

      let res = await axios({
        method: 'POST',
        url: `${API_URL}/sub`,
        data: d,
      });

      let {client_secret, status} = res.data;

      if (status === 'requires_confirmation') {
        await confirmPayment(client_secret, {type: 'Card'}).then(function (
          result,
        ) {
          if (result.error) {
            console.log(result.error);
          } else {
            setLoading(true);
            dispatch(ACTIONS.register(route.params.token, res.data));
          }
        });
      } else {
        setLoading(true);
        dispatch(ACTIONS.register(route.params.token, res.data));
      }
    }
  };
  return (
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
      {loading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner isVisible={true} size={350} type="Bounce" color="#7371FC" />
          <Text
            style={{
              fontFamily: 'Manrope-Regular',
              color: 'black',
              fontSize: 20,
              marginTop: '5%',
            }}>
            Paiement en cours...
          </Text>
        </View>
      ) : (
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier">
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
        </StripeProvider>
      )}
    </View>
  );
});

export default confirmation;
