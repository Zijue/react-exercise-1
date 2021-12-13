import React from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, persistor } from './store';
import history from './history';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import Tabs from './components/Tabs';
import './style/common.less';
import Register from './routes/Register';
import Login from './routes/Login';
import Detail from "./routes/Detail";
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Spin />} persistor={persistor}>
            <ConnectedRouter history={history}>
                <main className='main-container'>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/register' component={Register} />
                        <Route path='/login' component={Login} />
                        <Route path='/detail/:id' component={Detail} />
                        <Redirect to='/' />
                    </Switch>
                    <Tabs />
                </main>
            </ConnectedRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));