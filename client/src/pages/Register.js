import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';

import { variables } from '../helpers/environment/environment';
import logoAlkemy from '../assets/images/logo_labs.png';
import styles from '../styles/Register.module.css';

const Register = () => {
    const history = useHistory();
    
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
                        //Validate surname
                        if(!fields.surname){
                            errors.surname = 'Please insert surname to continue'
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(fields.surname)){
                            errors.surname = 'The surname can only contain letters and spaces'
                        }
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
                        //Validate confirm password
                        if(!fields.password_virtual){
                            errors.password_virtual = 'Please confirm password to continue'
                        }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(fields.password)){
                            errors.password_virtual = 'The password must be at least 8-16 characters long, at least one digit, at least one lowercase, and at least one uppercase. It may have other symbols'
                        }else if(fields.password_virtual !== fields.password){
                            errors.password_virtual = 'Passwords have to match'
                        }
                        
                        return errors
                    }}
                    onSubmit={(fields, { resetForm }) => {
                        resetForm();
                        let options = {
                            "method" : "POST",
                            "url" : `${variables.urlUser}/create`,
                            "header" : {
                                ContentType: "application/json"
                            },
                            "data" : {
                                name: fields.name,
                                surname: fields.surname,
                                email: fields.email,
                                password: fields.password,
                                password_virtual: fields.password_virtual
                            }
                        }
                        axios.request(options)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Great!',
                                text: 'try log in now',
                                confirmButtonText: 'Cool'
                            })
                            .then(result => {
                                if(result.isConfirmed || result.isDismissed){
                                    history.push("/login")
                                }
                            })
                        })
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
                            {touched.surname && errors.surname ? <p className={styles.error}>{errors.surname}</p> : ''}

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
                            {touched.password && errors.password ? <p className={styles.error}>{errors.password}</p> : ''}

                            <Field 
                                type='password' 
                                name="password_virtual"
                                placeholder="Confirm password"
                            />
                            {touched.password_virtual && errors.password_virtual ? <p className={styles.error}>{errors.password_virtual}</p> : ''}

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