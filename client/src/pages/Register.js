import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import logoAlkemy from '../assets/images/logo_labs.png';
import styles from '../styles/Register.module.css';
import Swal from 'sweetalert2';

const Register = () => {
    const history = useHistory();

    // const alertContents2 = () => {

    //     if (http_request.readyState === 4) {
    //         if (http_request.status === 201) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Great!',
    //                 text: 'try log in now',
    //                 confirmButtonText: 'Cool'
    //             })
    //             .then(result => {
    //                 if(result.isConfirmed || result.isDismissed){
    //                     history.push("/login")
    //                 }
    //             })
    //         } else {
    //             alert("Hubo un problema en la peticion")
    //         }
    //     }

    // }
    
    // var http_request = false;

    // const postRegister = (url) => {

    //     http_request = false;

    //     if (window.XMLHttpRequest) { 
    //         http_request = new XMLHttpRequest();
    //         if (http_request.overrideMimeType) {
    //             http_request.overrideMimeType('text/xml');
    //         }
    //     } 

    //     if (!http_request) {
    //         alert('Falla :( No es posible crear una instancia XMLHTTP');
    //         return false;
    //     }
    //     http_request.onreadystatechange = alertContents2;
    //     http_request.open('POST', url, true);
    //     http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     http_request.send(`name=${user.name}&surname=${user.surname}&email=${user.email}&password=${user.password}&password_virtual=${user.password_virtual}`);
    // }

    return (
        <div className={styles.container}>
            <div className={styles.contentInfo}>
                <div className={styles.contentImage}>
                    <img src={logoAlkemy} alt="logo-alkemy"/>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        email: '',
                        password: '',
                        password_virtual: ''
                    }}
                    validate={(fields) => {
                        let errors = {}

                        //Validate name
                        if(!fields.name){
                            errors.name = 'Please insert name to continue'
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(fields.name)){
                            errors.name = 'The name can only contain letters and spaces'
                        }
                        //Validate email
                        if(!fields.email){
                            errors.email = 'Please insert email to continue'
                        }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(fields.email)){
                            errors.email = 'The email can only contain letters, numbers, periods, scripts and underscore'
                        }

                        return errors
                    }}
                    onSubmit={(fields, {resetForm}) => {
                        resetForm();
                        console.log('Form send')
                    }}
                >
                    {({ errors,touched }) => (
                        <Form className={styles.form}>
                            <Field
                                type='text' 
                                name="name"
                                placeholder="John"
                            />
                            {touched.name && errors.name ? <p className={styles.error}>{errors.name}</p> : ''}

                            <Field
                                type='text' 
                                name="surname"
                                placeholder="Doeh"
                            />

                            <Field
                                type='email' 
                                name="email"
                                placeholder="correo@correo.com"
                            />
                            {touched.email && errors.email ? <p className={styles.error}>{errors.email}</p> : ''}

                            <Field
                                type='password' 
                                name="password"
                                placeholder="password"
                            />

                            <Field 
                                type='password' 
                                name="password_virtual"
                                placeholder="Confirm password"
                            />

                            <button type='submit' className={styles.button}> Register </button>
                        </Form>
                    )}
                </Formik>
                <h3>Are you ready account? <Link to="/login">Sign in</Link></h3>
            </div>
        </div>
    )      
}

export default Register;