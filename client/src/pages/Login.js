import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';

import { loginUser } from '../store/user/actions';
import { connect } from 'react-redux';

import { variables } from '../helpers/environment/environment';
import logoAlkemy from '../assets/images/logo_labs.png';
import styles from '../styles/Login.module.css';

const Login = ({LOGIN}) => {

    const history = useHistory();

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
                        let options = {
                            "method": "POST",
                            "url": `${variables.urlUser}/login`,
                            "header": {
                                ContentType: "application/json"
                            },
                            "data": {
                                email : fields.email,
                                password : fields.password
                            }
                        }
                        axios.request(options)
                        .then(user => {
                            localStorage.setItem("user", JSON.stringify(user.data))
                            LOGIN(user.data)
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
                        })
                        .catch(err => {
                            Swal.fire({
                                icon:'error',
                                title: 'something went wrong',
                                text: `${err.message}`
                            })
                        })
                        
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

const mapDispatchToProps = (dispatch) => {
    return{
        LOGIN: (user) => dispatch(loginUser(user))
    }
}

export default connect(null,mapDispatchToProps)(Login);