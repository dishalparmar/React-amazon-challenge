import React from 'react';
import './Checkout.css';
import { useStateValue } from '../State/StateProvider';
import Subtotal from '../Subtotal/Subtotal';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {

const [{ basket }, dispatch] = useStateValue();

  return (
    <div className='checkout'>
        <div className='checkout-left'>
            <img className='checkout-ad' src='https://images-eu.ssl-images-amazon.com/images/G/02/AMAZON-FASHION/2018/FASHION/PRIME_WARDROBE/XSITE/LAUNCH_OCT/UK_400x39._CB483365775_.jpg' alt='Banner' />
            <div className='checkout-title'>Your Shopping Basket</div>
            {basket.map(item => (
              <CheckoutProduct
                key={item.id} 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating} 
                />
            ))}
        </div>
        <div className='checkout-right'>
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout