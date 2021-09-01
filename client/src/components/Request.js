import React,{ useState } from 'react';
import styles from "../styles/Request.module.css";
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';

const Request = () => {
    
    let logged = JSON.parse(localStorage.getItem("user"));

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(base64);
    };

    const [result, setResult] = useState([])

    var http_request = false;
    const responseCreate = () => {
        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                let response = JSON.parse(http_request.response)
                setResult(result.concat(response))

                Swal.fire({
                    icon:'success',
                    title: 'new operation create successfully'
                })
            } else {
                alert("Hubo un problema en la peticion")
            }
        }
    }
    
    const createOperation = (url,input) => {
        http_request = false;
        let decode = parseJwt(logged)
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
        http_request.onreadystatechange = responseCreate;
        http_request.open('POST', url, false);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(`concept=${input.concept}&mount=${input.mount}&type=${input.type}&idUser=${decode.user.id}`);
    }

    const getDate = (time) => {
        let d = new Date(time);
        let date = d.toDateString();

        return date
    } 

    return (
        <div className={styles.container}>
            <div className={styles.contentForm}>
                <Formik
                    initialValues={{
                        concept: '',
                        mount: '',
                        type: ''
                    }}
                    validate={(fields) => {
                        let errors = {}
                        //Validate concept
                        if(!fields.concept){
                            errors.concept = 'Please insert concept to continue'
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(fields.concept)){
                            errors.concept = 'The concept can only contain letters and spaces'
                        }
                        //Validate mount
                        if(!fields.mount){
                            errors.mount = 'Please insert mount to continue'
                        }else if(!/^\d+$/.test(fields.mount)){
                            errors.mount = 'They must be just numbers'
                        }

                        return errors
                    }}
                    onSubmit={(fields) => {
                        if(logged){
                            createOperation('http://localhost:3001/operations/create',fields)
                        }else{
                            Swal.fire({
                                icon:'error',
                                title: 'something went wrong',
                                text: 'please login for create operation'
                            })
                        }
                    }}
                >
                    {({errors, touched}) => (
                        <Form className={styles.form} >
                            <Field
                                type="text"
                                name="concept"
                                placeholder="Ej: rent"
                            />
                            {touched.concept && errors.concept ? <p className={styles.error}>{errors.concept}</p> : ''}

                            <Field
                                type="number"
                                name="mount"
                                placeholder="Ej: 9999"
                            />
                            {touched.mount && errors.mount ? <p className={styles.error}>{errors.mount}</p> : ''}

                            <Field name="type" as="select">
                                <option value="" hidden>Choose here</option>
                                <option defaultValue="ingress">ingress</option>
                                <option value="egress">egress</option>
                            </Field>  

                            <button className={styles.button} type='submit' >send</button>
                        </Form>
                    )}
                </Formik>

            </div>
            {result && result.length > 0 ? (
                <div className={styles.contentOperations}>
                    <ul className={styles.headersTable}>
                        <li>concept</li>
                        <li>mount</li>
                        <li>type</li>
                        <li>date</li>
                    </ul>
                    {result.map((elem,i) => {
                        return (
                            <ul key={i} className={elem.type === 'ingress' ? styles.color : styles.withoutColor }>
                                <li>{elem.concept}</li>
                                <li>{elem.mount}</li>
                                <li>{elem.type}</li>
                                <li>{getDate(elem.createdAt)}</li>
                            </ul>
                        )
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Request;