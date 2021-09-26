import React,{ useState, useEffect } from "react";

import { deleteOperation, getAllOperations, getOperationsFilter,putOperation } from "../store/operations/actions";
import { connect } from 'react-redux';

import { alertDeleteOperation, alertUpdateOperation } from "../helpers/Alerts/alerts";
import { parseJwt } from "../helpers/parseJwt/parseJwt";

import TableContentLoader from '../components/Skeleton/TableContentLoader';
import iconDelete from '../assets/images/delete.png';
import iconEdit from '../assets/images/edit.png';
import styles from '../styles/Home.module.css';

const Home = ({OPERATIONS, LOADING, GETALL_OPERATIONS, FILTER_OPERATIONS, DELETE_OPERATION, UPDATE_OPERATION, USER}) => {

    let logged = JSON.parse(localStorage.getItem("user"));
    let showSkeleton = ["1","2","3"]

    const [decode, setDecode] = useState(null)
    const [balance, setBalance] = useState(null);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        logged ? setDecode(parseJwt(logged)) : setDecode(null)

        let decodeUser = logged ? parseJwt(logged) : ""
        GETALL_OPERATIONS(logged ? decodeUser.user.id : "")

    },[GETALL_OPERATIONS,logged])

    const currentBalance = () => {
        let ingress = 0
        let egress = 0
        if(OPERATIONS && OPERATIONS.length > 0){
            for(let i = 0; i < OPERATIONS.length; i++){
                if(OPERATIONS[i].type === "ingress"){
                    ingress += parseInt(OPERATIONS[i].mount)
                }else if(OPERATIONS[i].type === "egress"){
                    egress += parseInt(OPERATIONS[i].mount)
                }
            }  
            let rest = ingress - egress
            setBalance(rest) 
        }else{
            setBalance(null)
        }
        
        setHidden(hidden ? false : true)
    }

    const getDate = (time) => {
        let date = new Date(time).toDateString();

        return date
    } 

    return(
        <div className={styles.container}>
            <h1>HOME</h1>
            <div className={styles.contentOperations}>
                <div className={styles.contentBalance}>
                    <button 
                        className={styles.button} 
                        onClick={() => currentBalance()}> 
                            balance
                    </button>
                    {balance ? (
                        <p className={hidden ? styles.active : styles.hidden}>{balance}</p>  
                    ):(
                        <p className={hidden ? styles.active : styles.hidden}>0</p>  
                    )}
                </div>
                <label>Filter:</label>
                <div className={styles.filter}>
                    <button 
                        className={styles.button} 
                        onClick={() => FILTER_OPERATIONS("ingress",decode ? decode.user.id : "")}> 
                            Ingress 
                    </button>
                    <button 
                        className={styles.button} 
                        onClick={() => FILTER_OPERATIONS("egress",decode ? decode.user.id : "")}> 
                            Egress 
                    </button>
                    <button 
                        className={styles.button} 
                        onClick={() => FILTER_OPERATIONS("",decode ? decode.user.id : "")}> 
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
                {LOADING ? (
                    <>
                    {showSkeleton.map((i) => <TableContentLoader key={i}/>)}
                    {USER && USER.length === 0 && <p>add new operation to see it here</p>}
                    </>
                ) : (
                    OPERATIONS && OPERATIONS.length > 0 ? OPERATIONS.map((elem,i) => {
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
                                        onClick={() => alertDeleteOperation(logged,DELETE_OPERATION,elem.id)}
                                    />
                                    <img 
                                        className={styles.iconEdit}
                                        src={iconEdit} 
                                        alt="iconEdit" 
                                        width="18px"
                                        onClick={() => alertUpdateOperation(logged,UPDATE_OPERATION,elem.id)}
                                    />
                                </li>
                            </ul>
                        )
                    }).slice(0,10) : <p>Sorry no finded operations</p>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        OPERATIONS: state.operationReducer.operations,
        LOADING: state.operationReducer.operationsLoading,
        USER: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GETALL_OPERATIONS: (idUser) => dispatch(getAllOperations(idUser)),
        FILTER_OPERATIONS: (type,idUser) => dispatch(getOperationsFilter(type,idUser)),
        DELETE_OPERATION: (operationId) => dispatch(deleteOperation(operationId)),
        UPDATE_OPERATION: (idOperation,concept,mount,type) => dispatch(putOperation(idOperation,concept,mount,type))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);