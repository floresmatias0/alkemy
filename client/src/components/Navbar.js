import React,{ useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import alkemyLogo from '../assets/images/logo-header.png';
import menuFold from '../assets/images/menu.png';

const Navbar = () => {

    let logged = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();
    const [hidden, setHidden] = useState(false);
    const [name, setName] = useState(null);

    useEffect(() => {
        if(logged){
            let decode = parseJwt(logged)
            setName(decode.user.name)
        }// eslint-disable-next-line
    },[])

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(base64);
    };

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
                            {name} 
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
            <div className={styles.separatorNav}>
                <ul className={styles.contentNavResponsive}>
                    <li className={styles.imageResponsive}> 
                        <img onClick={() => history.push("/")} src={alkemyLogo} alt="logo" width="180px" />  
                    </li>
                    <li className={styles.menu}>  
                        <img  src={menuFold} alt="menu"  onClick={() => setHidden(hidden ? false : true)}/>   
                    </li>
                </ul>
            </div>
            <div className={hidden ? `${styles.separatorNewNav} animate__animated animate__bounceInDown` : styles.hidden}>
                {logged ? (
                    <ul className={styles.contentUserResponsive}>
                        <li>
                            <NavLink activeClassName={styles.active} to="/profile"> 
                                {name} 
                            </NavLink>
                        </li> 
                        <li> 
                            <NavLink activeClassName={styles.active} to="/operations"> Operations </NavLink>  
                        </li>
                    </ul>
                ) : 
                (      
                    <ul className={styles.contentUserResponsive}>          
                        <li><NavLink activeClassName={styles.active} to="/register"> Register </NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="/login"> Login </NavLink></li>
                    </ul>
                )}
            </div>
        </div>
        </>
    )
}

export default Navbar;