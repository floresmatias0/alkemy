import React,{ useState } from 'react';
import styles from "../styles/Request.module.css";

const Request = () => {
    
    const [result, setResult] = useState([])
    const [input, setInput] = useState({
        concept: "",
        mount: "",
        type:""
    })

    const alertContents = () => {

        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                console.log(JSON.parse(http_request.response))
            } else {
                alert("Hubo un problema en la peticion")
            }
        }

    }
    
    var http_request = false;
    function makeRequestPost(url) {

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
        http_request.send(`concept=${input.concept}&mount=${input.mount}&type=${input.type}`);

    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        makeRequestPost('http://localhost:3001/operations/create')
        console.log(result)
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
        </div>
    )
}

export default Request;