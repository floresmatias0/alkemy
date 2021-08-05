import React,{ useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import alkemyLogo from '../assets/images/logo-header.png';
import menuFold from '../assets/images/menu.png';

const Navbar = () => {
    const history = useHistory();

    const [hidden, setHidden] = useState(true);
    let logged = JSON.parse(localStorage.getItem("user"));

    return (
        <>
        <div className={styles.Nav}>
            <ul className={logged ? styles.contentUser : styles.contentNav}>
                <li className={logged ? styles.imageUser : styles.imageNav}> 
                    <img onClick={() => history.push("/")} src={alkemyLogo} alt="logo" width="180px" />  
                </li>
                <li> 
                    <NavLink activeClassName={styles.active} to="/operations"> Operations </NavLink>  
                </li>
            </ul>
            {logged ? (
                <ul className={styles.user}>
                    <li>
                        <NavLink activeClassName={styles.active} to="/profile"> 
                            {logged.name} 
                        </NavLink>
                    </li> 
                </ul>
            ) : 
            (      
                <ul className={styles.contentNav}>          
                    <li><NavLink activeClassName={styles.active} to="/register"> Register </NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/login"> Login </NavLink></li>
                </ul>
            )}
        </div>
        <div className={styles.NavResponsive}>
            <ul>
                <li className={styles.imageResponsive}> 
                    <img onClick={() => history.push("/")} src={alkemyLogo} alt="logo" width="180px" />  
                </li>
                <li className={styles.menu}>  
                    <img  src={menuFold} alt="menu"  onClick={() => setHidden(hidden ? false : true)}/>   
                </li>
            </ul>
        </div>
        </>
    )
}

export default Navbar;