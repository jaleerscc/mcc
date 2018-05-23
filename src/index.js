import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "material-icons/iconfont/material-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "roboto-fontface/css/roboto-slab/roboto-slab-fontface.css";
import "react-notifications/lib/notifications.css";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
