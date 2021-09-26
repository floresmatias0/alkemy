import React,{ useState } from 'react';
import styles from "../styles/Request.module.css";
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import { parseJwt } from '../helpers/parseJwt/parseJwt';
import axios from 'axios';
import { variables } from '../helpers/environment/environment';

const Request = () => {
    
    let logged = JSON.parse(localStorage.getItem("user"));

    const [result, setResult] = useState([])

    const getDate = (time) => {
        let date = new Date(time).toDateString();

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
                            let decode = parseJwt(logged)
                            let options = {
                                "method" : "POST",
                                "url" : `${variables.urlOperations}/create`,
                                "header" : {
                                    ContentType : "application/json"
                                },
                                "data" : {
                                    concept : fields.concept,
                                    mount : fields.mount,
                                    type: fields.type,
                                    idUser: decode.user.id
                                }
                            }
                            axios.request(options)
                            .then((response) => {
                                setResult(result.concat(response.data))
                                Swal.fire({
                                    icon:'success',
                                    title: 'new operation create successfully'
                                })
                            })
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