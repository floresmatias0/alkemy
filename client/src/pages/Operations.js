import React from 'react';
import Request from '../components/Request';
import styles from '../styles/Operations.module.css';

const Operations = () => {
    return (
        <div className={styles.container}>
            <h1>OPERATIONS</h1>
            <Request/>
        </div>
    )
}

export default Operations;