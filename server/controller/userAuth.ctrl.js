// functions used in the backend
var firebase = require('firebase');

module.exports = {
    createUser: (req, res, next) => {
        // req is what's passed from the front end
        // req.body contains variables passed typically json objects
        // req.params are values passed through the url
        var email = req.body.email;
        var password = req.body.password;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = String(error.code);
            var errorMessage = String(error.message);
            res.status(400).json({message : errorCode + ' ' + errorMessage}); // indicate the error in res.data.error
        });
        // This is used to make sure user is signed in. Afterwards can call user and retrieve information such as uid within if
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                // Store in database user name and email

                //ref = where to store the data
                //in users 'table' inside the tab which is userid
                firebase.database().ref('users/' + user.uid).set({
                    email: req.body.email,
                    name : req.body.name,
                    courseList: ""
                })
                .then(function() { // everything was successful
                    res.status(201).json({message : 'User created successfully'})
                })
                .catch(function (error){ // error with storing in database
                    var errorCode = String(error.code);
                    var errorMessage = String(error.message);
                    res.status(400).json({message : errorCode + ' ' + errorMessage});
                });
            }
        });
    },

    logInUser: (req, res,next) => {
        var email = req.body.email;
        var password = req.body.password;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => {
            firebase.auth().onAuthStateChanged(function(user) {
                if(user){
                    res.status(201).json({message : 'Successful log in. UserID: ' + user.uid})
                }
            })
        })
        .catch(function(error) {
            var errorCode = String(error.code);
            var errorMessage = String(error.message);
            res.status(400).json({message : errorCode + ' ' + errorMessage});
        });
    },

    logout: (req, res, next) => {
        firebase.auth().signOut();
        res.status(201).json({message : 'Successful logged out.'})
    },

    checkLoggedIn: (req, res, next) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                res.status(201).json({loggedIn : true})
            } else {
                res.status(201).json({loggedIn : false})
            }
        });
    }
}
