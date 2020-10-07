import React,{createContext,} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {store} from './store/MobxStateTree'

//context
const Theme = createContext('light')


ReactDOM.render(
  <Theme.Provider value={'dark'}>
  
  {/* <React.StrictMode> */}
    <App store={store}/>
  {/* </React.StrictMode> */}
  </Theme.Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
