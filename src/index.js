import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux';
import reducers from './store/reducers/index.reducer';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
));

window.store = store;

//@TODO LOGOUT crutch. https://github.com/redux-effects/redux-effects-localstorage
window.addEventListener('storage', (e)=>{
    const key = e.key;
    const newValue = e.newValue;
    if(key === "token" && !newValue) {
        store.dispatch({
            type: 'AUTH_LOGOUT',
        })
    }
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);