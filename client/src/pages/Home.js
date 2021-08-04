import React,{ useState, useEffect } from "react";
import styles from '../styles/Home.module.css';

const Home = () => {

    const [arr, setArr] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
       const callAll = () => {
        makeRequest('http://localhost:3001/operations')
       } 
       callAll()
    },[])

    var http_request = false;

    function makeRequest(url) {
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
        http_request.onreadystatechange = alertContentsV2;
        http_request.open('GET', url, true);
        http_request.send();

    }

    function deleteOperation(url) {
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
        http_request.onreadystatechange = alertContentsV3;
        http_request.open('DELETE', url, true);
        http_request.send();

    }
    function alertContentsV3() {
        if (http_request.readyState === 4) {
            if (http_request.status === 202) {
                alert(http_request.response) 
                window.location.reload()
            } else {
                alert('Hubo problemas con la petición.');
                setLoading(true);
            }
        }
    }
    function alertContentsV2() {
        setLoading(false)
        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                let response = JSON.parse(http_request.response) 
                setArr(response);
                setLoading(true);
            } else {
                alert('Hubo problemas con la petición.');
                setLoading(true);
            }
        }
    }

    const getDate = (time) => {
        let d = new Date(time);
        let date = d.toDateString();

        return date
    } 
    return(
        <div className={styles.container}>
            <h1>HOME</h1>
            {arr && arr.length > 0 && loading ? (
                <div className={styles.contentOperations}>
                    <ul>
                        <li>concept</li>
                        <li>mount</li>
                        <li>type</li>
                        <li>date</li>
                        <li></li>
                    </ul>
                    {arr.map((elem,i) => {
                        return (
                            <ul key={i}>
                                <li>{elem.concept}</li>
                                <li>{elem.mount}</li>
                                <li>{elem.type}</li>
                                <li>{getDate(elem.createdAt)}</li>
                                <li onClick={() => deleteOperation(`http://localhost:3001/operations/delete/${elem.id}`)}>delete</li>
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

export default Home;