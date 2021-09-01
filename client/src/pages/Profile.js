import React,{ useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';

const Profile = () => {

    const [ user, setUser ] = useState()

    let logged = JSON.parse(localStorage.getItem("user"))
    
    useEffect(() => {
        if(logged){
          let decode = parseJwt(logged)
          let obj = {
              name: decode.user.name,
              surname: decode.user.surname,
              email: decode.user.email
          }
          setUser(obj) 
        }// eslint-disable-next-line
    },[])

    const logout = () => {
        localStorage.clear()
        window.location.reload()
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

export default Profile;