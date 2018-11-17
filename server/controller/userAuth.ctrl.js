// functions used in the backend
const firebase = require('firebase');

module.exports = {
    createUser: (req, res, next) => {
        // req is what's passed from the front end
        // req.body contains variables passed typically json objects
        // req.params are values passed through the url
        var email = req.body.email;
        var password = req.body.password;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            //ref = where to store the data
            //in users 'table' inside the tab which is userid
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid).set({
                email: req.body.email,
                name : req.body.name,
                courseList: ""
            })
            .then(function() { // everything was successful
                res.status(200).json({message : 'User created successfully'})
            })
            .catch(function (error) {
                // Handle error with storing user information in database
                var errorCode = String(error.code);
                var errorMessage = String(error.message);
                res.status(400).json({message : errorCode + ' ' + errorMessage}); // indicate the error in res.data.error
            });
        })
        .catch(function (error) {
            // Handle error with creating specified user.
            var errorCode = String(error.code);
            var errorMessage = String(error.message);
            res.status(400).json({message : errorCode + ' ' + errorMessage}); // indicate the error in res.data.error
        });
    },

    logInUser: (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            res.status(200).json({message : 'Successful log in.'})
        })
        .catch(function(error) {
            var errorCode = String(error.code);
            var errorMessage = String(error.message);
            res.status(400).json({message : errorCode + ' ' + errorMessage});
        });
    },

    logout: (req, res, next) => {
        firebase.auth().signOut();
        res.status(200).json({message : 'Successful logged out.'})
    },

    sayHello: (req, res, next) => {
        res.status(200).json({message : 'Hello World'})
    },

    checkLoggedIn: (req, res, next) => {
        var user = firebase.auth().currentUser;
        if(user){
            res.status(400).json({loggedIn: true});
        }
        else{
            res.status(400).json({loggedIn: false});
        }
    }
}
