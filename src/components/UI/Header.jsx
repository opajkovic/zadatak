import React from 'react';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const navigateHomeHandler = () => {
    navigate('/')
  }

  const navigateAddHandler = () => {
    navigate('/products/add')
  }
    return (
        <header className={classes.header}>
          <div className={classes.link} onClick={navigateHomeHandler} >
                Home           
          </div>
          <div className={classes.link} onClick={navigateAddHandler}>   
         Add Item   
     </div>   
        </header>
    )
}
export default Header;