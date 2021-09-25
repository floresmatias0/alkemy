import React,{ useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../store/user/actions';
import styles from '../styles/Profile.module.css';

const Profile = ({USER,LOGIN}) => {
    const [ user, setUser ] = useState()
    let history = useHistory()

    useEffect(() => {
        if(USER){
          let decode = parseJwt(USER)
          let obj = {
              name: decode.user.name,
              surname: decode.user.surname,
              email: decode.user.email
          }
          setUser(obj) 
        }
    },[USER])

    useEffect(() => {
        if(!USER){
            history.push("/login")
        }
    },[USER,history])

    const logout = () => {
        LOGIN(false)
        localStorage.clear()
    }

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(base64);
    };

    return (
        <div className={styles.container}>
            <h1>PROFILE</h1>
            {user ? (
                <>
                <div className={styles.contentInfo}>
                    <ul className={styles.headersUser}>
                        <li>name</li>
                        <li>surname</li>
                        <li>email</li>
                    </ul>
                    <ul className={styles.data}>
                        <li>{user.name}</li>
                        <li>{user.surname}</li>
                        <li>{user.email}</li>          
                    </ul>
                </div>
                <button
                    className={styles.button} 
                    onClick={() => logout()}>
                        Logout
                </button>  
                </>
            ):(
                <></>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        LOGIN: (user) => dispatch(loginUser(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);