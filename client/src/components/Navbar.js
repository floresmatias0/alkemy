import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import alkemyLogo from '../assets/images/logo-header.png';

const Navbar = () => {
    const history = useHistory();

    let logged = JSON.parse(localStorage.getItem("user"))

    return (
        <div className={styles.Nav}>
            <ul>
                <li className={styles.image}> 
                    <img onClick={() => history.push("/")} src={alkemyLogo} alt="logo" width="180px" />  
                </li>
                <li> <NavLink activeClassName={styles.active} to="/operations"> Operations </NavLink>  </li>
            </ul>
            {logged ? (
                <ul className={styles.user}>
                    <li><NavLink activeClassName={styles.active} to="/profile"> {logged.name} </NavLink></li> 
                </ul>
            ) : 
            (      
                <ul>          
                    <li><NavLink activeClassName={styles.active} to="/register"> Register </NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/login"> Login </NavLink></li>
                </ul>
            )}
        </div>
    )
}

export default Navbar;