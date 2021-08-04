import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import logoAlkemy from '../assets/images/logo_labs.png';
import styles from '../styles/Login.module.css';
import Swal from 'sweetalert2';

const Login = () => {

    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        email:"",
        password:"",
        password_virtual:""
    })

    const alertContents2 = () => {

        if (http_request.readyState === 4) {
            if (http_request.status === 201) {
                alert(http_request.response);
            } else {
                alert("Hubo un problema en la peticion")
            }
        }else{
            console.log(http_request.readyState)
        }

    }
    
    var http_request = false;
    const postRegister = (url) => {

        http_request = false;

        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } 

        if (!http_request) {
            alert('Falla :( No es posible crear una instancia XMLHTTP');
            return false;
        }
        http_request.onreadystatechange = alertContents2;
        http_request.open('POST', url, true);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(`email=${user.email}&password=${user.password}&password_virtual=${user.password_virtual}`);

    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...user,
            [e.target.name]: e.target.value
            })
        );
    }

    const validate = (user) => {
        let errors = {};
        if(!user.email) {
            errors.email = 'email is required';
        } else if (!/\S+@\S+/.test(user.email)) {
             errors.email = 'email is invalid';
        }
        if(user.password && user.password_virtual && user.password !== user.password_virtual){
            errors.password_virtual = 'should match the previous password'
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!user.name || !user.surname || !user.password_virtual || !user.password || !user.email){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'complete the form'
            })
        }else{
           postRegister('http://localhost:3001/users/create');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentInfo}>
                <div className={styles.contentImage}>
                    <img src={logoAlkemy} alt="logo-alkemy"/>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type='email' 
                        onChange={handleChange}
                        name="email"
                        value={user.email}
                        placeholder="Email"
                        autoComplete="new-password"
                    />
                    {errors.email && (errors.email === 'email is required' || errors.email === 'email is invalid')
                    ?(
                        <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.email}</p> 
                    ):(
                        <></>
                    )}
                    <input type='password' 
                        onChange={handleChange}
                        name="password"
                        value={user.password}
                        placeholder="Password"
                        autoComplete="new-password"
                    />
                    <input type='password' 
                        onChange={handleChange}
                        name="password_virtual"
                        value={user.password_virtual}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                    />
                    {errors.password_virtual && errors.password_virtual === 'should match the previous password'
                    ?(
                        <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.password_virtual}</p> 
                    ):(
                        <></>
                    )}
                    <button type='submit' className={styles.button}> Sign in </button>
                </form>
                <h3>Don't have an account? <Link to="/register">Sign up</Link></h3>
            </div>
        </div>
    )      
}

export default Login;