import React,{ useState, useEffect } from "react";
import styles from "../styles/Home.module.css"

const Home = () => {

    const [arr, setArr] = useState("")

    useEffect(()=>{
       const callAll = () => {
        makeRequest('http://localhost:3001/operations')
       } 

       callAll()
    },[])

    const [input, setInput] = useState({
        concept: "",
        mount: "",
        date: "",
        type:""
    })

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
        http_request.send(`concept=${input.concept}&mount=${input.mount}&date=${input.date}&type=${input.type}`);

    }

    function makeRequest(url) {

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
        http_request.onreadystatechange = alertContentsV2;
        http_request.open('GET', url, true);
        http_request.send();

    }

    function alertContents() {

        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                alert(http_request.response);
            } else {
                alert('Hubo problemas con la petición.');
            }
        }

    }

    function alertContentsV2() {

        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                alert(http_request.response);
                let response = JSON.parse(http_request.response) 
                setArr(response);
            } else {
                alert('Hubo problemas con la petición.');
            }
        }

    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        makeRequestPost('http://localhost:3001/operations/create')
    }

    return(
        <div className={styles.container}>
            <h1>hola soy un home</h1>
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
                    <label>date</label>
                    <input 
                    type="date"
                    name="date"
                    onChange={handleChange}
                    />
                    <label>type</label>
                    <select name="type" onChange={handleChange}>
                        <option value="entry">entry</option>
                        <option value="egress">egress</option>
                    </select>
                    <button type="submit">send</button>
                </form>
            </div>
            <div>
                {arr && arr.length > 0 ? (
                    <div>
                        {arr.map((operation,i) => {
                            return (
                                <div className={styles.operation} key={i}>
                                    <ul>
                                        <li>concept: {operation.concept}</li>
                                        <li>mount: $ {operation.mount}</li>
                                        <li>date: {operation.date}</li>
                                        <li>type: {operation.type}</li>
                                    </ul>
                                </div>
                            )
                        })
                        }
                    </div>
                ):(
                    <p></p>
                )}
            </div>
        </div>
    )
}

export default Home;