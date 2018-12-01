//functions for dashboard
const firebase = require('firebase');

module.exports = {

    getUsername: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else{
         //we want to get data in the table users based on the uid
         var ref = firebase.database().ref("users/" + req.body.id + "/name");
         ref.once("value", function(snapshot) {
            res.status(200).json({name : snapshot.val()});
         }, function (errorObject) {
            res.status(400).json({message: errorObject});
         });
      }
    },

    getUseremail: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else{
         //we want to get data in the table users based on the uid
         var ref = firebase.database().ref("users/" + req.body.id + "/email");
         ref.once("value", function(snapshot) {
            res.status(200).json({email : snapshot.val()})
         }, function (errorObject) {
            res.status(400).json({message: errorObject});
         });
      }
    },

    addCourses: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else{
         //course is what is being passed in from the frontend
         var course = req.body.courseName;
         //ref is the path for uid
         var ref = firebase.database().ref("users/" + req.body.id + "/courseList");
         ref.once("value", function(snapshot){
             var found = false;
             snapshot.forEach(function(data) {
                 if(data.val() == course){
                     found = true;
                 }
             });
             if(!found) ref.push(course);
         });

         //makes a new ref to store users that will be taking this course
         var newref = firebase.database().ref("CoursesTakenByUser/" + req.body.courseName);
         //pushes the user's uid into here, this mean user has added this course into their course list
         //making a new ref here makes it more easy to grab all the users that has this course in their courselist
         newref.push(req.body.id);

         res.status(200).json({message: "course added"});
      }
    },

    updateSocialMedia: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.urlList === undefined){
         res.status(400).json({message: "Missing url"});
      }
      else{
         //Url is what is being passed in from the frontend
         var urlList = req.body.urlList;
         //ref is the path for uid
         firebase.database().ref('users/' + req.body.id + '/socialMedia').update(urlList)
         .then(function(){
             res.status(200).json({message: "Social media link added"});
         })
         .catch(function(error){
             res.status(400).json({message: error.message});
         });
      }
    },

    deleteSocialMedia: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.url === undefined){
         res.status(400).json({message: "Missing url"});
      }
      else{
         var url = req.body.url;
         var ref = firebase.database().ref("users/" + req.body.id + "/socialMedia");
         ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap) {
               if (childsnap.val() === url){
                  ref.child(childsnap.key).remove();
               }
            });
         });
         res.status(200).json({message: "url deleted"});
      }
   },

   getSocialMedia: (req, res, next) => {
     if(req.body.id === undefined){
        res.status(400).json({message: "Missing user ID"});
     }
     else{
        //we want to get data in the table users based on the uid
        var ref = firebase.database().ref("users/" + req.body.id + "/socialMedia");
        var urls = [];
        ref.once("value", function(snapshot) {
           var list = snapshot.val();
           for (var key in list) {
              urls.push(list[key]);
           }
           res.status(200).json({"urlList": urls});
        }, function (errorObject) {
           res.status(400).json({message: errorObject.code});
        });
     }
   },

    getUserCourses: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else{
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
      }
    },

    deleteUserCourses: (req, res, next) => {
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else{
         var course = req.body.courseName;
         var ref = firebase.database().ref("users/" + req.body.id + "/courseList");
         var newref = firebase.database().ref("CoursesTakenByUser/" + req.body.courseName);
         ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap) {
               if (childsnap.val() === course){
                  ref.child(childsnap.key).remove();
               }
            });
            newref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap) {
                console.log(childsnap.val());
               if (childsnap.val() === req.body.id){
                  newref.child(childsnap.key).remove();
               }
            });
         });
         });

         res.status(200).json({message: "course deleted"});
      }
   },
    getUsersByCourseTaken: (req, res, next) => {
      if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else{
          var users = []
          var ref = firebase.database().ref("CoursesTakenByUser/" + req.body.courseName);
          ref.once("value", function (snapshot){
              console.log(snapshot.val())
              snapshot.forEach(function (childsnap) {
                  users.push(childsnap.val());
              });
             res.status(200).json({users: users});
          });
      }

    }
}
