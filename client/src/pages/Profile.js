import React,{ useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import styles from '../styles/Profile.module.css';

const Profile = () => {

    let history = useHistory();

    let logged = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if(!logged){
            history.push("/")
        }
    })

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className={styles.container}>
            <h1>PROFILE</h1>
            {logged ? (
                <>
                <div className={styles.contentInfo}>
                    <ul className={styles.headersUser}>
                        <li>name</li>
                        <li>surname</li>
                        <li>email</li>
                    </ul>
                    <ul className={styles.data}>
                        <li>{logged.name}</li>
                        <li>{logged.surname}</li>
                        <li>{logged.email}</li>          
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