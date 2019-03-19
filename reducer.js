import cloneObject from './deepCopy';


const initialState = {
    toDoItems: {},
    toDoText: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_TEXT':
            return { ...state, toDoText: action.data };
        case 'ADD_ITEM': return addNewToDo(state);
        case 'MARK_COMPLETED': return markCompleted(state, action.data);
        case 'SELECTED_STATUS': return toggleSelectedStatus(state, action.data);
        case 'DELETE_ITEM': return deleteToDo(state, action.data);
        case 'DELETE_COMPLETED_ITEM': return deleteCompletedToDo(state);
        case 'DELETE_SELECTED_ITEM': return deleteSelectedToDo(state);
        case 'UPDATE_STATUS': return toggleUpdateStatus(state, action.data);
        case 'UPDATE_ITEM': return updateToDo(state, action.todoId, action.toDoText)
        default: {
            return state;
        }
    }
}


function addNewToDo(state) {
    let newToDo = {
        toDoId: new Date().getTime(),
        toDoText: state.toDoText,
        toDoCompletedStatus: false,
        toDoChecked: false,
        toDoUpdateStatus: false
    };

    let toDoItems = { ...state.toDoItems };
    toDoItems[newToDo.toDoId] = newToDo;
    return { ...state, toDoItems };
}

function markCompleted(state, todoID) {
    let toDoItems = { ...state.toDoItems };
    console.log(toDoItems);
    // toDoItems[todoID] = { ...toDoItems[todoID] };
    toDoItems[todoID] = cloneObject(toDoItems[todoID]);
    console.log(toDoItems);
    toDoItems[todoID].toDoCompletedStatus = !toDoItems[todoID].toDoCompletedStatus;
    
    return { ...state, toDoItems };
}

function toggleSelectedStatus(state, todoID) {
    let toDoItems = Object.assign({}, state.toDoItems);
    console.log(toDoItems);
    toDoItems[todoID] = { ...toDoItems[todoID] };
    toDoItems[todoID].toDoChecked = !toDoItems[todoID].toDoChecked;
    console.log(toDoItems);
    return { ...state, toDoItems };
}

function deleteToDo(state, todoID) {
    let toDoItems = Object.assign({}, state.toDoItems);
    toDoItems[todoID] = { ...toDoItems[todoID] };

    delete toDoItems[todoID];
    return { ...state, toDoItems };
}

function deleteCompletedToDo(state) {
    let toDoItems = Object.assign({}, state.toDoItems);

    Object.keys(toDoItems).forEach(toDoId => {
        if (toDoItems[toDoId].toDoCompletedStatus) {
            toDoItems[toDoId] = {...toDoItems[toDoId]};
            delete toDoItems[toDoId];
        }
    });
    return { ...state, toDoItems };
}

function deleteSelectedToDo(state) {
    let toDoItems = Object.assign({}, state.toDoItems);

    Object.keys(toDoItems).forEach(toDoId => {
        if (toDoItems[toDoId].toDoChecked) {
            toDoItems[toDoId] = { ...toDoItems[toDoId] };
            delete toDoItems[toDoId];
        }
    });
    return { ...state, toDoItems };
}

function toggleUpdateStatus(state, todoID) {
    let toDoItems = Object.assign({}, state.toDoItems);
    toDoItems[todoID] = { ...toDoItems[todoID] };

    toDoItems[todoID].toDoUpdateStatus = !toDoItems[todoID].toDoUpdateStatus;
    return { ...state, toDoItems };
}

function updateToDo(state, todoID, todoText) {
    let toDoItems = Object.assign({}, state.toDoItems);
    toDoItems[todoID] = JSON.parse(JSON.stringify(toDoItems[todoID]));

    toDoItems[todoID].toDoText = todoText;
    return { ...state, toDoItems };
}
export default reducer;