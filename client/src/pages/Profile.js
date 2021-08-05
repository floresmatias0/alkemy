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

    return (
        <div className={styles.container}>
            <h1>PROFILE</h1>
            {logged ? (
                <ul>
                    <li>{logged.name}</li>
                    <li>{logged.surname}</li>
                    <li>{logged.email}</li>                
                </ul>
            ):(
                <></>
            )}
        </div>
    )
}

export default Profile;