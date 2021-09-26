import React,{ useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import alkemyLogo from '../assets/images/logo-header.png';
import menuFold from '../assets/images/menu.png';
import { connect } from 'react-redux';
import { parseJwt } from '../helpers/parseJwt/parseJwt';

const Navbar = ({USER}) => {

    const history = useHistory();
    const [hidden, setHidden] = useState(false);
    const [name, setName] = useState(null);

    useEffect(() => {
        if(USER){
            let decode = parseJwt(USER)
            setName(decode.user.name)
        }
    },[USER])

    return (
        <>
        <div className={styles.Nav}>
            <ul className={USER ? styles.contentUser : styles.contentNav}>
                <li className={USER ? styles.imageUser : styles.imageNav}> 
                    <img onClick={() => history.push("/")} src={alkemyLogo} alt="logo" width="180px" />  
                </li>
                <li> 
                    <NavLink activeClassName={styles.active} to="/operations"> Operations </NavLink>  
                </li>
            </ul>
            {USER ? (
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
                {USER ? (
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

const mapStateToProps = (state) => {
    return {
        USER: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Navbar);