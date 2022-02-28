import React from 'react';
import './Home.css';
import Product from '../Product/Product';

function Home() {
  return (
    <div className='home'>
        <div className='home-container'>
            <img className='home-img' src='https://m.media-amazon.com/images/I/717eiU3INTL._SX3000_.jpg' alt='Home Img'/>
            <div className='home-row'>
                <Product id='1'
                         title='The Lean Startup' 
                         image='https://images-na.ssl-images-amazon.com/images/I/51aEhyjQGrL._SX316_BO1,204,203,200_.jpg' 
                         price={11.99} 
                         rating={5} />
                <Product id='2'
                         title='Kenwood Mix for baking and style kitchen mixer with K' 
                         image='https://m.media-amazon.com/images/I/61FJtVQh9bL._AC_SL1200_.jpg' 
                         price={39.99} 
                         rating={3} />
            </div>
            
            <div className='home-row'>
                <Product id='3'
                         title='Samsung QE55QN85AATXXU 55" Smart 4K Ultra HD HDR Neo QLED TV with Bixby, Alexa & Google Assistant' 
                         image='https://m.media-amazon.com/images/I/81fq4r3jB9S._AC_UY218_.jpg' 
                         price={100} 
                         rating={2} />
                <Product id='4'
                         title='Apple Watch Series 7 (GPS, 41mm) - Midnight Aluminium Case with Midnight Sport Band - Regular' 
                         image='https://m.media-amazon.com/images/I/814f2fJ8f7L._AC_UY218_.jpg' 
                         price={20.00} 
                         rating={4} />
                <Product id='5'
                         title='Projector, Top vision Native 1080P WiFi Bluetooth Projector with Synchronize Smartphone Screen,Supports 9500L Outdoor Projector 4K ,Touch screen Portable Projector Compatible with Android/iOS/USB' 
                         image='https://m.media-amazon.com/images/I/71+-HnvmLdL._AC_UY218_.jpg' 
                         price={39.99} 
                         rating={5} />
            </div>

            <div className='home-row'>
                <Product id='6'
                         title='Huawei Mateview GT 34 inch 1500R Curved Gaming Monitor-165Hz Refresh rate, 3440x1440 VA Screen,HDR,HDMI,Display port,Black，Bundle with XBox Game Pass' 
                         image='https://m.media-amazon.com/images/I/81Q3qFp0SxL._AC_UY218_.jpg' 
                         price={17.99} 
                         rating={1} />
            </div>
        </div>
    </div>
  )
}

export default Home