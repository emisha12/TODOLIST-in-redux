import React from 'react';
import styles from './App.module.css';
import { connect } from 'react-redux';

function ToDoItem(props) {
    console.log("todoitem render");
    let completedToDo = styles.todoText;
    let toDoTextElement;

    if (props.todoDetail.toDoCompletedStatus) {
        completedToDo = styles.completed;
    }

    if (props.todoDetail.toDoUpdateStatus) {
        toDoTextElement = (<input
            type="text" value={props.todoDetail.toDoText}
            onChange={(event) => props.updateItem(event, props.todoDetail.toDoId)}
            onKeyUp={(event) => updateToDo(event, props.todoDetail.toDoId)}>
        </input>);
    } else {
        toDoTextElement = (<p className={completedToDo} >{props.todoDetail.toDoText}</p>);
    }

    const updateToDo = function (event, todoId) {
        if (event.keyCode === 13) {
            props.updateToDoStatus(todoId);
        }
    }


    return (
        <div className={styles.todoItem} id={props.todoDetail.toDoId}>
            <input type="checkbox" onClick={() => props.setSelectedStatus(props.todoDetail.toDoId)} />
            {toDoTextElement}
            <button className={styles.doneBtn} onClick={() => props.markCompleted(props.todoDetail.toDoId)}>Done</button>
            <button className={styles.deleteBtn} onClick={() => props.deleteItem(props.todoDetail.toDoId)}>Delete</button>
            <button className={styles.updateBtn} onClick={() => props.updateToDoStatus(props.todoDetail.toDoId)} >Update</button>
        </div>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        setSelectedStatus: (toDoId) => dispatch({ type: 'SELECTED_STATUS', data: toDoId }),
        markCompleted: (toDoId) => dispatch({ type: 'MARK_COMPLETED', data: toDoId }),
        deleteItem: (toDoId) => dispatch({ type: 'DELETE_ITEM', data: toDoId }),
        updateToDoStatus: (toDoId) => dispatch({ type: 'UPDATE_STATUS', data: toDoId }),
        updateItem: (event, toDoId) => dispatch({ type: 'UPDATE_ITEM', todoId: toDoId, toDoText: event.target.value })
    };
}

export default connect(null, mapActionsToProps)(ToDoItem);
