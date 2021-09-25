import React,{ useState, useEffect } from "react";

import iconDelete from '../assets/images/delete.png';
import iconEdit from '../assets/images/edit.png';

import { connect } from 'react-redux';
import { deleteOperation, getAllOperations, getOperationsFilter,putOperation } from "../store/operations/actions";

import { alertDeleteOperation, alertUpdateOperation } from "../helpers/Alerts/Alerts";
import { parseJwt } from "../helpers/parseJwt/parseJwt";

import TableContentLoader from '../components/Skeleton/TableContentLoader';
import styles from '../styles/Home.module.css';

const Home = ({OPERATIONS, LOADING, GETALL_OPERATIONS, FILTER_OPERATIONS, DELETE_OPERATION, UPDATE_OPERATION}) => {

    let logged = JSON.parse(localStorage.getItem("user"));
    let showSkeleton = ["1","2","3"]

    const [balance, setBalance] = useState(0);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if(logged){
            let decode = parseJwt(logged)
            GETALL_OPERATIONS(decode.user.id)
        }
    },[GETALL_OPERATIONS,logged])

    const currentBalance = () => {
        let ingress = 0
        let egress = 0
        for(let i = 0; i < OPERATIONS.length; i++){
            if(OPERATIONS[i].type === "ingress"){
                ingress += parseInt(OPERATIONS[i].mount)
            }else if(OPERATIONS[i].type === "egress"){
                egress += parseInt(OPERATIONS[i].mount)
            }
        }

        let rest = ingress - egress
        setBalance(rest)
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
                        <></>
                    )}
                </div>
                <label>Filter:</label>
                <div className={styles.filter}>
                    <button 
                        className={styles.button} 
                        onClick={() => FILTER_OPERATIONS("ingress")}> 
                            Ingress 
                    </button>
                    <button 
                        className={styles.button} 
                        onClick={() => FILTER_OPERATIONS("egress")}> 
                            Egress 
                    </button>
                    <button 
                        className={styles.button} 
                        onClick={() => FILTER_OPERATIONS()}> 
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
                    showSkeleton.map((i) => <TableContentLoader key={i}/>)
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GETALL_OPERATIONS: (idUser) => dispatch(getAllOperations(idUser)),
        FILTER_OPERATIONS: (type) => dispatch(getOperationsFilter(type)),
        DELETE_OPERATION: (operationId) => dispatch(deleteOperation(operationId)),
        UPDATE_OPERATION: (idOperation,concept,mount,type) => dispatch(putOperation(idOperation,concept,mount,type))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);