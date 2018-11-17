import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import "../node_modules/aos/dist/aos.css";
import * as firebase from 'firebase';

AOS.init();
const theme = createMuiTheme();

const API_KEY = process.env.Firebase_API_Key;
const SENDER_ID = process.env.Firebase_Sender_ID;

var config = {
    apiKey: "AIzaSyBvsVosbnkWQ9M7bYxxDzWKXTvuXzCcE2Y",
    authDomain: "studybuddys-8fe89.firebaseapp.com",
    databaseURL: "https://studybuddys-8fe89.firebaseio.com",
    projectId: "studybuddys-8fe89",
    storageBucket: "",
    messagingSenderId: "48350702100"
  };
  firebase.initializeApp(config);

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <App />
</MuiThemeProvider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
