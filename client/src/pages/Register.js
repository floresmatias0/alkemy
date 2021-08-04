import React,{ useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../styles/Register.module.css';
import Swal from 'sweetalert2'

const Register = () => {

    const history = useHistory();

    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        name:"",
        surname:"",
        email:"",
        password:"",
        password_virtual:""
    })

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
        if (!user.name) {
            errors.name = 'name is required';
        } 
        if (!user.surname) {
            errors.surname = 'surname is required';
        } 
        if (!user.email) {
            errors.email = 'email is required';
        } else if (!/\S+@\S+/.test(user.email)) {
             errors.email = 'email is invalid';
        }
        if (user.password && user.password_virtual && user.password !== user.password_virtual){
            errors.password_virtual = 'should match the previous password'
        }
        return errors;
    };

    const alertContents = () => {

        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                console.log(http_request.response)
                alert(http_request.response);
            } else {
                alert('Hubo problemas con la petición.');
            }
        }

    }
    
    var http_request = false;
    const makeRequestPost = (url) => {

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
        http_request.send(` name=${user.name}
                            &surname=${user.surname}
                            &email=${user.email}
                            &password=${user.password}
                            &password_virtual=${user.password_virtual}`);

    }

    const handleSubmit = async(e) => {
        console.log(user)
        e.preventDefault()
        if(!user.name || !user.surname || !user.password_virtual || !user.password || !user.email){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'complete the form'
            })
        }else{
            makeRequestPost('http://localhost:3001/users/create')
        }
    }

    return (
        <div className={styles.container}>
            <h1>Complete the form register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Name</label>
                <input type='text' 
                       onChange={handleChange}
                       name="name"
                       value={user.name}
                />
                {errors.name && errors.name === 'name is required'
                ?(

                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.name}</p> 
                ):(
                    <></>
                )}
                <label>Surname</label>
                <input type='text' 
                       onChange={handleChange}
                       name="surname"
                       value={user.surname}
                />
                {errors.surname && errors.surname === 'surname is required' 
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.surname}</p> 
                ):(
                    <></>
                )}
                <label>Email</label>
                <input type='email' 
                       onChange={handleChange}
                       name="email"
                       value={user.email}
                />
                {errors.email && (errors.email === 'email is required' || errors.email === 'email is invalid')
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.email}</p> 
                ):(
                    <></>
                )}
                <label>Password</label>
                <input type='password' 
                       onChange={handleChange}
                       name="password"
                       value={user.password}
                />

                <label>Confirm Password</label>
                <input type='password' 
                       onChange={handleChange}
                       name="password_virtual"
                       value={user.password_virtual}
                />
                {errors.password_virtual && errors.password_virtual === 'should match the previous password'
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.password_virtual}</p> 
                ):(
                    <></>
                )}

                <button type='submit' className={styles.button}> Register </button>
            </form>
        </div>
    )      
}

export default Register;