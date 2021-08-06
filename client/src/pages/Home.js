import React,{ useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import Swal from 'sweetalert2';
import iconDelete from '../assets/images/delete.png';
import iconEdit from '../assets/images/edit.png';

const Home = () => {

    let logged = JSON.parse(localStorage.getItem("user"));
    const [arr, setArr] = useState("");
    const [filtered, setFiltered] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(()=>{
       const callAll = () => {
            getOperations('http://localhost:3001/operations')
       } 
       callAll()
        // eslint-disable-next-line
    },[])

    const currentBalance = () => {
        let ingress = 0
        let egress = 0
        for(let i = 0; i < arr.length; i++){
            if(arr[i].type === "ingress"){
                ingress += parseInt(arr[i].mount)
            }else if(arr[i].type === "egress"){
                egress += parseInt(arr[i].mount)
            }
        }

        let rest = ingress - egress
        setBalance(rest)
    }

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
        if (http_request.readyState === 4) {
            if (http_request.status === 200) {
                let response = JSON.parse(http_request.response) 
                setFiltered(response)
                setArr(response);
            } else {
                alert('Hubo problemas con la petición.');
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

    function editOperation(url,concept,mount) {
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
        http_request.onreadystatechange = responseEdit;
        http_request.open('PUT', url, true);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(`concept=${concept}&mount=${mount}`);
    }

    function responseEdit() {
        if (http_request.readyState === 4) {
            if (http_request.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'edit successfully'
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

    const alertDelete = (url) => {
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

    const alertEdit = (url,concept,mount) => {
        if(logged){
            Swal.fire({
                html: `
                <div class=${styles.popUpEdit}>
                    <input type="text" id="concept" placeholder="Concept">
                    <input type="number" id="mount" placeholder="Mount">
                </div>`,
                showCancelButton: true,
                confirmButtonText: 'Edit',
                cancelButtonColor: '#d33',
                focusConfirm: false,
                preConfirm: () => {
                  const concept = Swal.getPopup().querySelector('#concept').value
                  const mount = Swal.getPopup().querySelector('#mount').value
                  if (concept || mount) {
                    editOperation(url,concept,mount)
                  }
                }
              }).then((result) => {
                if(result.isConfirmed){
                    window.location.reload()
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

    const filterIngress = () => {
        let ingress = filtered.filter(elem => elem.type !== "egress")
        return setArr(ingress)
    }

    const filterEgress = () => {
        let egress = filtered.filter(elem => elem.type !== "ingress")
        return setArr(egress)
    }

    const filterAll = () => {
        return setArr(filtered)
    }

    return(
        <div className={styles.container}>
            <h1>HOME</h1>
            {arr && arr.length > 0 ? (
                <div className={styles.contentOperations}>
                    <div className={styles.contentBalance}>
                        <button 
                            className={styles.button} 
                            onClick={() => currentBalance()}> 
                                balance
                        </button>
                        {balance ? (
                            <p>{balance}</p>  
                        ):(
                            <></>
                        )}
                    </div>
                    <label>Filter:</label>
                    <div className={styles.filter}>
                        <button 
                            className={styles.button} 
                            onClick={() => filterIngress()}> 
                                ingress 
                        </button>
                        <button 
                            className={styles.button} 
                            onClick={() => filterEgress()}> 
                                egress 
                        </button>
                        <button 
                            className={styles.button} 
                            onClick={() => filterAll()}> 
                                All
                        </button>
                    </div>
                    <ul className={styles.headersTable}>
                        <li>concept</li>
                        <li>mount</li>
                        <li>type</li>
                        <li>date</li>
                        <li>edit</li>
                    </ul>
                    {arr.map((elem,i) => {
                        return (
                            <ul key={i} className={i%2 === 0 ? styles.pair : styles.odd}>
                                <li>{elem.concept}</li>
                                <li>{elem.mount}</li>
                                <li>{elem.type}</li>
                                <li>{getDate(elem.createdAt)}</li>
                                <li className={styles.delete}>
                                    <img 
                                        className={styles.iconDelete}
                                        src={iconDelete} 
                                        alt="iconDelete" 
                                        width="18px"
                                        onClick={() => alertDelete(`http://localhost:3001/operations/delete/${elem.id}`)}
                                    />
                                    <img 
                                        className={styles.iconEdit}
                                        src={iconEdit} 
                                        alt="iconEdit" 
                                        width="18px"
                                        onClick={() => alertEdit(`http://localhost:3001/operations/update/${elem.id}`)}
                                    />
                                </li>
                            </ul>
                        )
                    }).slice(0,10)}
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Home;