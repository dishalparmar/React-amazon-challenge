import React from 'react';
import './Checkout.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useStateValue } from '../State/StateProvider';

function CheckoutProduct({id, title, image, price, rating, hideButton}) {

  const [{basket}, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'RemoveFromBasket', 
      id: id
    });
  };
  
  return (
    <div className='checkout-product'>
      <img className='checkout-product-img' src={image}  alt='' />
        <div className='checkout-product-info'>
            <p className='checkout-product-title'>{title}</p>
            <p className='checkout-product-price'>
              <small>£</small>
              <strong>{price}</strong>
            </p>
            <p className='checkout-product-rating'>
              {Array(rating).fill().map((_, i) => (
                <StarRateIcon key={i}/>
              ))}
            </p>

            {/* Only show this button if "hideButton" has not been passed in as props */}
            {!hideButton && (<button onClick={removeFromBasket}>Remove from basket</button>)}
        </div>
    </div>
  )
}

export default CheckoutProduct