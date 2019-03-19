import React from 'react';
import styles from './App.module.css';
import { connect } from 'react-redux';

function ToDoActionBar(props) {
    console.log("todoactionbar render");
    return (
        <div className={styles.app}>
            <h1 > To do List...</h1>
            <div className={styles.addPanel}>
                <h3>Add an event</h3>
                <div className={styles.innerAddPanel}>
                    <label>Enter event to add into list: </label>
                    <input type="text" placeholder="Enter event" onChange={props.updateInputText} />
                    <button className={styles.btn} onClick={props.addNewToDo}>Add to list</button>
                </div>
            </div>
        </div>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        addNewToDo: () => dispatch({ type: 'ADD_ITEM' }),
        updateInputText: (event) => dispatch({ type: 'UPDATE_TEXT', data: event.target.value })
    };
}

export default connect(null, mapActionsToProps)(ToDoActionBar);

