//functions for dashboard
var firebase = require('firebase');

module.exports = {

    getUsername: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        //we want to get data in the table users based on the uid
        var ref = firebase.database().ref("users/" + user.uid + "/name");

        ref.on("value", function(snapshot) {
        console.log({name : snapshot.val()});
        res.status(201).json({name : snapshot.val()})
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

    },

    getUseremail: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        //we want to get data in the table users based on the uid
        var ref = firebase.database().ref("users/" + user.uid + "/email");

        ref.on("value", function(snapshot) {
        console.log({email : snapshot.val()});
        res.status(201).json({email : snapshot.val()})
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

    },

    addCourses: (req, res, next) => {
        //course is what is being passed in from the frontend
        var course = req.body.courseName;
        //user is for uid
        var user = firebase.auth().currentUser;
        //ref is the path for uid
        var ref = firebase.database().ref("users/" + user.uid + "/courseList");
        ref.push(course);
        res.status(201).json("course added");
    },

    getUserCourses: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        //we want to get data in the table users based on the uid
        var ref = firebase.database().ref("users/" + user.uid + "/courseList");
        var courses = [];
        ref.once("value", function(snapshot) {
            var list = snapshot.val();
            for (var key in list) {
                courses.push(list[key]);
            }
            res.status(201).json({"courseList": courses});
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    },

    deleteUserCourses: (req, res, next) => {
        var course = req.body.courseName;
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref("users/" + user.uid + "/courseList");
        ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap) {
                if (childsnap.val() === course){
                    ref.child(childsnap.key).remove();
                }
            });
        });
        res.status(201).json("course deleted");
    }
}
