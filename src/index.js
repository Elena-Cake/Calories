import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import store from './redux/reduxStore';

import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const rerenderEntireTree = () => {

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider value={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

rerenderEntireTree();

store.subscribe(() => {
  rerenderEntireTree()
});

reportWebVitals();
