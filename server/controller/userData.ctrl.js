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
        var ref = firebase.database().ref("user/");
        var updateCourses = ref.child(user.uid).child("courseList");
        console.log(updateCourses);

        updateCourses.transaction(function(courses) {
            courses = updateCourses.concat(', ', course);
            return courses;
        })
    }
}
