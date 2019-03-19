import React from 'react';
import ToDoItem from './ToDoItem';
import styles from './App.module.css';
import { connect } from 'react-redux';

function ToDoList(props) {
    console.log("todolist render");
    return (
        <div className={styles.todoWrapper}>
            {Object.keys(props.toDoItems).map(todoId => {
                return (<ToDoItem key={todoId} todoDetail={props.toDoItems[todoId]} />);
            }
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        toDoItems: state.toDoItems
    };
}

export default connect(mapStateToProps)(ToDoList);
