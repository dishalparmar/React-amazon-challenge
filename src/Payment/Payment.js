import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from '../State/StateProvider';
import CheckoutProduct from '../Checkout/CheckoutProduct';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../State/Reducer';
import axios from '../Axios';
import { db } from '../Firebase';

function Payment() {

  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);               // Error handling for stripe input (when user types in card nr)
  const [disabled, setDisabled] = useState(true);         // Error handling for (when user types in card nr)
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);    // Telling stripe, here is a payment of £50 can you give me a client secret which I can use to run by the card 

  useEffect(() => {

    // Generate strip client secret which allows us the charge the customer. 
    // If the basket changes we need a new client secret.
    // Because the old one was attached to £50 and now the basked it £60
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
        //Remember Stripe wants currencies in subunits i.e. if you are paying in £, they want it in pence
        //If you sending £10 it should be 1000
      });
      setClientSecret(response.data.clientSecret);
    }

    getClientSecret();

  }, [basket]);

  const submitPayment = async (e) => {

    e.preventDefault();
    setProcessing(true);

    // Stripe stuff
    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.email,
          email: user.email
          }
      } 
    }).then(( { paymentIntent } ) => {          // Destructure the response we get from strip, payment intent, which we destructure with {paymentIntent}
                                                // paymentIntent = payment Confirmation from stripe
      db.collection('users')                    // We want to push customers orders to DB (Firebase)
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)                // Order id
        .set({
          basket: basket,
          amount: paymentIntent.amount,       // Amount we get back from paymentIntent response
          created: paymentIntent.created      // Date stamp we get back crom paymentIntent response
        })

       setSucceeded(true);
       setProcessing(false);
       setError(null);

      // We want to emapy the basket now
      dispatch({
       type: 'EmptyBasket'
      });

      // Last we want to send user to the orders page
      navigate('/orders', {replace: true});

    })
  }

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  }

  return (
    <div className='payment'>
      <div className='payment-container'>
      <Link to='/checkout'><h1><ArrowBackIcon />Checkout ({basket?.length} items)</h1></Link>

        {/* Address */}
        <div className='payment-section'>
          <div className='payment-title'><h3>Delivery Address</h3></div>
          <div className='payment-address'>
            <p>{user?.email}</p>
            <p>123 Cigar Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review */}
        <div className='payment-section'>
          <div className='payment-title'><h3>Renew item(s) for Delivery</h3></div>
          <div className='payment-items'>
            {basket.map(item => ( 
              <CheckoutProduct 
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating} />
            ))}
          </div>
        </div>

        <div className='payment-section'>
          <div className='payment-title'><h3>Payment</h3></div>
          <div className='payment-details'>
            {/* Stripe Step 1: npm install @stripe/react-stripe-js @stripe/stripe-js */}
            {/* Stripe Step 2: Create / Login to strip account and get the "Publishable key" */}
            {/* Stripe Step 3: In App.js > const promise = loadStripe('Publishable key'); */}
            {/* Stripe Step 4: In App.js > Wrap payment component inside <Elements stripe={promise}/>*/}
          <form onSubmit={submitPayment}>
            { clientSecret && basket?.length > 0 && (
              <CardElement onChange={handleChange} />
            )}
              <div className='payment-total-price'>
                <CurrencyFormat renderText={(value) => (
                        <h3>Order Total: {value}</h3>
                    )} 
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'£'}
                />
              </div>
              <button type='submit' className='payment-btn' disabled={disabled || processing || succeeded}>
                  <span>{processing ? 'Processing' : 'Buy Now'}</span>
                </button>
              {error && <div>{error}</div>}         { /* If we have an error show it */ }
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Payment