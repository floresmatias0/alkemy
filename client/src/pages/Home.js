import React,{ useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import Swal from 'sweetalert2';
import iconDelete from '../assets/images/delete.png';

const Home = () => {

    let logged = JSON.parse(localStorage.getItem("user"));
    const [arr, setArr] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
       const callAll = () => {
            getOperations('http://localhost:3001/operations')
       } 

       callAll() // eslint-disable-next-line
    },[])

    var http_request = false;

    function getOperations(url) {
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
        http_request.onreadystatechange = showOperations;
        http_request.open('GET', url, true);
        http_request.send();

    }

    function showOperations() {
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
        http_request.onreadystatechange = responseDelete;
        http_request.open('DELETE', url, true);
        http_request.send();

    }

    function responseDelete() {
        if (http_request.readyState === 4) {
            if (http_request.status === 202) {
                Swal.fire({
                    icon: 'success',
                    title: `${http_request.response}`,
                    confirmButtonText: 'Cool'
                }) 
                .then(result => {
                    if(result.isConfirmed || result.isDismissed){
                        window.location.reload()
                    }
                }) 
            } else {
                alert('Hubo problemas con la petición.');
            }
        }
    }

    const getDate = (time) => {
        let d = new Date(time);
        let date = d.toDateString();

        return date
    } 

    const verificationUser = (url) => {
        if(logged){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteOperation(url)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
              })  
        }else{
            Swal.fire({
                icon:'error',
                title: 'something went wrong',
                text: 'please login for delete operation'
            })
        }
    }
    return(
        <div className={styles.container}>
            <h1>HOME</h1>
            {arr && arr.length > 0 && loading ? (
                <div className={styles.contentOperations}>
                    <div>
                        <label>Filtrar por:</label>
                        <button onClick={() => setArr(arr.filter(elem => elem.type !== "egress"))}> ingress </button>
                        <button onClick={() => setArr(arr.filter(elem => elem.type !== "ingress"))}> egress </button>
                    </div>
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
                                <li 
                                    className={styles.delete}
                                    onClick={() => verificationUser(`http://localhost:3001/operations/delete/${elem.id}`)}>
                                        <img src={iconDelete} alt="iconDelete" width="18px"/>
                                </li>
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