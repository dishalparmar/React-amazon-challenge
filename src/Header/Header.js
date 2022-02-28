import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../State/StateProvider';
import { auth } from '../Firebase';

function Header() {

  const [{ basket, user }, dispatch] = useStateValue();
  
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };


  return (
    <div className='header'>
      <Link to='/'>
        <img className='header-logo' src='https://pnggrid.com/wp-content/uploads/2021/05/Amazon-Logo-Transparent-1024x310.png' alt='Amazon Logo - Home'/>
      </Link>
      <div className='header-search'>
        <input className='header-searchInput' type='text' />
        <SearchIcon className='header-searchIcon' />
      </div>
      <div className='header-nav'>
        <Link to={!user && '/login'}>
            <div className='header-option' onClick={handleAuthentication}>
                <span className='header-optionLineOne'>
                  {user ? user.email : 'Hello Guest'}
                </span>
                <span className='header-optionLineTwo'>
                  {user ? 'Sign Out' : 'Sign In'}
                </span>
            </div>
        </Link>
        <Link to='/orders'>
          <div className='header-option'>
              <span className='header-optionLineOne'>Returns</span>
              <span className='header-optionLineTwo'>& Orders</span>
          </div>
        </Link>

          <div className='header-option'>
            <span className='header-optionLineOne'>Your</span>
            <span className='header-optionLineTwo'>Prime</span>
          </div>
          <Link to='/checkout'>
            <div className='header-optionBasket'>
              <ShoppingBasketIcon />
              <span className='header-optionLineTwo header-basketCount'>{basket?.length}</span>
            </div>
          </Link>
      </div>
    </div>
  )
}

export default Header