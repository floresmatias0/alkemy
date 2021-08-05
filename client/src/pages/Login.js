import React,{ useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoAlkemy from '../assets/images/logo_labs.png';
import styles from '../styles/Login.module.css';
import Swal from 'sweetalert2';

const Login = () => {

    let logged = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if(logged){
            history.push("/")
        }// eslint-disable-next-line
    },[])

    const history = useHistory();

    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const alertContents = () => {

        if (http_request.readyState === 4) {
            if (http_request.status === 201) {
                localStorage.setItem("user", http_request.response)
                Swal.fire({
                    icon:'success',
                    title: 'Welcome',
                    confirmButtonText: 'Cool'
                })
                .then(result => {
                    if(result.isConfirmed || result.isDismissed){
                        history.push("/")
                    }
                })
            } else if (http_request.status === 402) {
                Swal.fire({
                    icon:'error',
                    title: 'something went wrong',
                    text: 'check email or password'
                })
            } else {
                alert("Hubo un problema en la peticion")
            }
        }else{
            console.log(http_request.readyState)
        }
    }
    
    var http_request = false;
    const postLogin = (url) => {

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
        http_request.onreadystatechange = alertContents;
        http_request.open('POST', url, true);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(`email=${user.email}&password=${user.password}`);
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
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!user.password || !user.email){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'complete the form'
            })
        }else{
           postLogin('http://localhost:3001/users/login');
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
                    <button type='submit' className={styles.button}> Sign in </button>
                </form>
                <h3>Don't have an account? <Link to="/register">Sign up</Link></h3>
            </div>
        </div>
    )      
}

export default Login;