import React from 'react';
import ToDoActionBar from './ToDoActionBar';
import ToDoList from './ToDoList';
import styles from './App.module.css';
import { connect } from 'react-redux';

function ToDoManager(props) {
    console.log("todomanager render");
    return (
        <>
            <ToDoActionBar />
            <ToDoList />
            <div className={styles.deleteWrapper}>
                <button className={styles.deleteBtn} onClick={props.deleteSelectedItem}>Delete selected events</button>
                <button className={styles.deleteBtn} onClick={props.deleteCompletedItem}>Delete completed events</button>
            </div>
        </>
    );
}


const mapActionsToProps = (dispatch) => {
    return {
        deleteSelectedItem: () => dispatch({ type: 'DELETE_SELECTED_ITEM' }),
        deleteCompletedItem: () => dispatch({ type: 'DELETE_COMPLETED_ITEM' }),
    };
}
export default connect(null, mapActionsToProps)(ToDoManager);

