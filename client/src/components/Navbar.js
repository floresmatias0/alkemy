import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import alkemyLogo from '../assets/images/logo-header.png'

const Navbar = () => {

    return (
        <div className={styles.Nav}>
            <ul>
                <li> 
                    <NavLink activeClassName="active" to="/">
                      <img src={alkemyLogo} alt="logo" width="100%"/>  
                    </NavLink>
                </li>
                <li> <NavLink activeClassName={styles.active} to="/operations"> Operations </NavLink>  </li>
            </ul>
        </div>
    )
}

export default Navbar;