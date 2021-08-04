import React,{ useState, useEffect } from "react";

const Home = () => {

    const [arr, setArr] = useState("")

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


    return(
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;