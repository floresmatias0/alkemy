import React,{ useState } from 'react';
import styles from "../styles/Request.module.css";
import Swal from 'sweetalert2';

const Request = () => {
    
    let logged = JSON.parse(localStorage.getItem("user"));
    const [result, setResult] = useState([])
    const [input, setInput] = useState({
        concept: "",
        mount: "",
        type:""
    })

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
    
    var http_request = false;

    function createOperation(url) {

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
        http_request.onreadystatechange = responseCreate;
        http_request.open('POST', url, false);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(`concept=${input.concept}&mount=${input.mount}&type=${input.type}&idUser=${logged.id}`);
    }

    function getUserById(url) {
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
        http_request.onreadystatechange = showUser;
        http_request.open('GET', url, false);
        http_request.send();

    }

    function showUser() {
        if (http_request.readyState === 4) {
            if (http_request.status === 201) {
                localStorage.removeItem("user");
                localStorage.setItem("user", http_request.response)
            } else {
                alert('Hubo problemas con la petición.');
            }
        }
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(logged){
            createOperation('https://heroku-api-alkemy.herokuapp.com/operations/create')
            getUserById(`https://heroku-api-alkemy.herokuapp.com/users/${logged.id}`)
        }else{
            Swal.fire({
                icon:'error',
                title: 'something went wrong',
                text: 'please login for create operation'
            })
        } 
    }

    const getDate = (time) => {
        let d = new Date(time);
        let date = d.toDateString();

        return date
    } 
    return (
        <div className={styles.container}>
            <div className={styles.contentForm}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                     type="text"
                     name="concept"
                     onChange={handleChange}
                     placeholder="concept"
                     />
                    <input
                     type="number"
                     name="mount"
                     onChange={handleChange}
                     placeholder="mount"
                     />
                    <select name="type" placeholder="type" onChange={handleChange}>
                        <option value=""  hidden>Choose here</option>
                        <option defaultValue="ingress">ingress</option>
                        <option value="egress">egress</option>
                    </select>
                    <button className={styles.button} type="submit">send</button>
                </form>
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