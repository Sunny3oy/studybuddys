//functions for dashboard
const firebase = require('firebase');

module.exports = {

    getUsername: (req, res, next) => {
      //we want to get data in the table users based on the uid
      var ref = firebase.database().ref("users/" + req.body.id + "/name");
      ref.on("value", function(snapshot) {
         res.status(200).json({name : snapshot.val()});
      }, function (errorObject) {
         res.status(400).json({message: errorObject});
      });
    },

    getUseremail: (req, res, next) => {
      //we want to get data in the table users based on the uid
      var ref = firebase.database().ref("users/" + req.body.id + "/email");
      ref.on("value", function(snapshot) {
         res.status(200).json({email : snapshot.val()})
      }, function (errorObject) {
         res.status(400).json({message: errorObject});
      });
    },

    addCourses: (req, res, next) => {
      //course is what is being passed in from the frontend
      var course = req.body.courseName;
      //ref is the path for uid
      var ref = firebase.database().ref("users/" + req.body.id + "/courseList");
      ref.push(course);
      res.status(200).json({message: "course added"});
    },

    getUserCourses: (req, res, next) => {
      //we want to get data in the table users based on the uid
      var ref = firebase.database().ref("users/" + req.body.id + "/courseList");
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
    },

    deleteUserCourses: (req, res, next) => {
      var course = req.body.courseName;
      var ref = firebase.database().ref("users/" + req.body.id + "/courseList");
      ref.once("value", function(snapshot){
         snapshot.forEach(function (childsnap) {
            if (childsnap.val() === course){
               ref.child(childsnap.key).remove();
            }
         });
      });
      res.status(200).json({message: "course deleted"});
   }
}
