import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './store'
import setupInterceptors from "./utils/axiosInterceptor";


const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
    </Provider>,
  </React.StrictMode>, 
  root
);
setupInterceptors(store);


