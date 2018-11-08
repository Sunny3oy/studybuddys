const express = require("express")
const routes = require('./routes/')
const cors = require('cors')
const bodyParser = require('body-parser')
const firebase = require('firebase')

const app = express()
const router = express.Router()

let port = 3001 || process.env.PORT

routes(router)

const API_KEY = process.env.Firebase_API_Key;

var config = {
    apiKey: API_KEY,
    authDomain: "studybuddys-8fe89.firebaseapp.com",
    databaseURL: "https://studybuddys-8fe89.firebaseio.com",
    projectId: "studybuddys-8fe89",
    storageBucket: "",
    messagingSenderId: "48350702100"
};
firebase.initializeApp(config);

app.use(cors())
app.use(bodyParser.json())

app.use('/api', router) // our api calls start with localhost:3001/api/

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
