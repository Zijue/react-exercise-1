import React from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import history from './history';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import Tabs from './components/Tabs';
import './style/common.less';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <main className='main-container'>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/profile' component={Profile} />
                    <Redirect to='/' />
                </Switch>
                <Tabs />
            </main>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));