import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';
var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "studybuddys-8fe89.firebaseapp.com",
  databaseURL: "https://studybuddys-8fe89.firebaseio.com",
  projectId: "studybuddys-8fe89",
  storageBucket: "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
