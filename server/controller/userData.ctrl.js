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

        function constructjson(jsonKey, jsonValue){
            var jsonObj = {};
            jsonObj[jsonKey] = jsonValue;
            return jsonObj;
        }
        ref.once("value", function (snapshot) {
            console.log(String(snapshot.numChildren()))
            let key = String(snapshot.numChildren());

            ref.update(constructjson(key,course));
        })
        //perform this function once
        //***************************************
        // ref.once("value", function (snapshot) {
        //     //test holds the current snapshot
        //   var test = snapshot.val();
        //   //how snapshot looks like
        //   console.log(snapshot.val());
        //   //accessing snapshot's child by using . operator
        //   console.log(test.courseList);
        //   //if courseList is empty
        //   if (test.courseList === "") {
        //       //updatedCourse becomes what we get from the front end
        //       updatedCourse = course;
        //   }
        //   //else, there are already courses stored in courselist, which means we should append courses to the current list
        //   else {
        //       updatedCourse = test.courseList.concat(",", course);
        //   }
        //
        //   console.log("stuff input to database inside ref.on " + updatedCourse);
        //   ref.update
        //       ({
        //           "courseList": updatedCourse
        //       });
        //
        // });
        //********************************************
        //var previousList = ref.
        res.status(201).json("course added");
    },

    getUserCourses: (req, res, next) => {
        //var user holds information on the current user
        var user = firebase.auth().currentUser;
        //we want to get data in the table users based on the uid
        var ref = firebase.database().ref("users/" + user.uid + "/courseList");

        ref.once("value", function(snapshot) {
        console.log(snapshot.val());
        res.status(201).json({"courseList": snapshot.val()});
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

    }
}
