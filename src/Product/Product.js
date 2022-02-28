import React from 'react';
import './Product.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useStateValue } from '../State/StateProvider';

function Product({id, title, image, price, rating}) {

const [{ basket }, dispatch] = useStateValue();

const addToBasket = () => {
    dispatch({
        type: 'AddToBasket',
        item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating
        }
    });
};

  return (
    <div className='product'>
        <div className='product-info'>
            <p>{title}</p>
            <p className='product-price'>
                <small>£</small>
                <strong>{price}</strong>
            </p>
            <div className='product-rating'>
                {Array(rating).fill().map(() => (     // Take the start number put it in array, .fill will fill up the array with that many spaces and map through each and print out the star
                    <StarRateIcon />
                ))}
            </div>
        </div>
        <img src={image} alt=''/>
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product