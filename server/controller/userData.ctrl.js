//functions for dashboard
const firebase = require('firebase');

module.exports = {

    getUsername: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        if(user){
            //we want to get data in the table users based on the uid
            var ref = firebase.database().ref("users/" + user.uid + "/name");
            ref.on("value", function(snapshot) {
                res.status(200).json({name : snapshot.val()});
            }, function (errorObject) {
                res.status(400).json({message: errorObject});
            });
        }
        else{
            res.status(400).json({message: "No user logged in."});
        }
    },

    getUseremail: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        if(user){
            //we want to get data in the table users based on the uid
            var ref = firebase.database().ref("users/" + user.uid + "/email");
            ref.on("value", function(snapshot) {
                res.status(200).json({email : snapshot.val()})
            }, function (errorObject) {
                res.status(400).json({message: errorObject});
            });
        }
        else{
            res.status(400).json({message: "No user logged in."});
        }
    },

    addCourses: (req, res, next) => {
        //course is what is being passed in from the frontend
        var course = req.body.courseName;
        //user is for uid
        var user = firebase.auth().currentUser;
        if(user){
            //ref is the path for uid
            var ref = firebase.database().ref("users/" + user.uid + "/courseList");
            ref.push(course);
            res.status(200).json({message: "course added"});
        }
        else{
            res.status(400).json({message: "No user logged in."});
        }
    },

    getUserCourses: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        if(user){
            //we want to get data in the table users based on the uid
            var ref = firebase.database().ref("users/" + user.uid + "/courseList");
            var courses = [];
            ref.once("value", function(snapshot) {
                var list = snapshot.val();
                for (var key in list) {
                    courses.push(list[key]);
                }
                res.status(200).json({"courseList": courses});
            }, function (errorObject) {
                res.status(400).json({message: errorObject.code});
            });
        }
        else{
            res.status(400).json({message: "No user logged in."});
        }
    },

    deleteUserCourses: (req, res, next) => {
        var course = req.body.courseName;
        var user = firebase.auth().currentUser;
        if(user){
            var ref = firebase.database().ref("users/" + user.uid + "/courseList");
            ref.once("value", function(snapshot){
                snapshot.forEach(function (childsnap) {
                    if (childsnap.val() === course){
                        ref.child(childsnap.key).remove();
                    }
                });
            });
            res.status(200).json({message: "course deleted"});
        }
        else{
            res.status(400).json({message: "No user logged in."});
        }
    }
}
