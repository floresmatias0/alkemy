import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoAlkemy from '../assets/images/logo_labs.png';
import styles from '../styles/Login.module.css';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';

const Login = () => {

    const history = useHistory();


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
        }
    }
    
    var http_request = false;

    const postLogin = (url,user) => {

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

    return (
        <div className={styles.container}>
            <div className={styles.contentInfo}>
                <div className={styles.contentImage}>
                    <img src={logoAlkemy} alt="logo-alkemy"/>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validate={(fields) => {
                        let errors = {}
                        //Validate email
                        if(!fields.email){
                            errors.email = 'Please insert email to continue'
                        }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(fields.email)){
                            errors.email = 'The email can only contain letters, numbers, periods, scripts and underscore'
                        }
                        //Validate password
                        if(!fields.password){
                            errors.password = 'Please insert password to continue'
                        }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(fields.password)){
                            errors.password = 'The password must be at least 8-16 characters long, at least one digit, at least one lowercase, and at least one uppercase. It may have other symbols'
                        }
                        return errors
                    }}
                    onSubmit={(fields, { resetForm }) => {
                        resetForm();
                        postLogin('http://localhost:3001/users/login',fields)
                    }}
                >
                    {({ touched,errors }) => (
                        <Form className={styles.form}>
                            <Field type='email' 
                                name="email"
                                placeholder="correo@correo.com"
                            />
                            {touched.email && errors.email ? <p className={styles.error}>{errors.email}</p>: ''}

                            <Field 
                                type='password' 
                                name="password"
                                placeholder="Password"
                            />
                            {touched.password && errors.password ? <p className={styles.error}>{errors.password}</p>: ''}

                            <button type='submit' className={styles.button}> Sign in </button>
                        </Form>
                    )}
                </Formik>
                
                <h3>Don't have an account? <Link to="/register">Sign up</Link></h3>
            </div>
        </div>
    )      
}

export default Login;