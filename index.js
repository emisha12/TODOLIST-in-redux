import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

const toDoStore = createStore(reducer);
ReactDOM.render(
    <Provider store={toDoStore}>
        < App />
    </Provider>
    ,
    document.getElementById('root')
);
