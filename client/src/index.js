import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './store/index';

import './index.css';

let store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk,logger),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode> 
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
