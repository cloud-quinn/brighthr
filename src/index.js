import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Redirect, Route, Router, Switch,
} from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers/rootReducer';
import HomePage from './pages/home';
import Header from './components/header';

const initialState = {
    documents: {},
};
const middleware = applyMiddleware(
    compose(thunkMiddleware),
);
const store = createStore(rootReducer, initialState, middleware);

const browserHistory = createBrowserHistory({ basename: '' });

const App = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    </Provider>
);

const root = document.querySelector('#root');

ReactDOM.render(App, root);
