import React,{ useState } from 'react';
import styles from "../styles/Operations.module.css"

const Request = () => {
    
    const [input, setInput] = useState({
        concept: "",
        mount: "",
        date: "",
        type:""
    })

    const alertContents = () => {

        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                alert(http_request.response);
            } else {
                alert('Hubo problemas con la petición.');
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
                // Ver nota sobre esta linea al final
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
    }

    return (
        <div className={styles.container}>
            <h1>New </h1>
            <div className={styles.contentForm}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>concept</label>
                    <input
                     type="text"
                     name="concept"
                     onChange={handleChange}
                     />
                    <label>mount</label>
                    <input
                     type="number"
                     name="mount"
                     onChange={handleChange}
                     />
                    <label>type</label>
                    <select name="type" onChange={handleChange}>
                        <option value="ingress">ingress</option>
                        <option value="egress">egress</option>
                    </select>
                    <button type="submit">send</button>
                </form>
            </div>
        </div>
    )
}

export default Request;