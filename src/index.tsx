import 'simplebar/src/simplebar.css';

import App from './components/App';
import ProviderHandler from './components/ProviderHandler';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

const Index = () => (
  <ProviderHandler>
    <App />
  </ProviderHandler>
);

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
