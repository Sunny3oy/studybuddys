const firebase = require('firebase');

module.exports = {
    //pre: front end passes in json with
    //date:the date of the meet up
    //time: the time of the meet up
    //description: the description of the meet up
    //id: the id of the person that is requesting the meet up
    //hookupsId: the person that the user is trying to set a meet up for
    //courseName: the name of the course that this meet up is for

    //post: meetup details is stored
    createMeetUp: (req, res, next) => {
        var id = req.body.id;
        var date = req.body.date;
        var time = req.body.time;
        var details = req.body.text;
        var hookupsId = req.body.meetupsId;
        var courseNameText = req.body.courseName;
        var ref = firebase.database().ref("meetUps/").push();
        var meetupID = ref.key;
        var ownerNameText;
        var otherNameText;
        var nameref = firebase.database().ref("users/" + req.body.id);
        if(req.body.id != req.body.meetupsId){
            nameref.once("value", function(snapshot){
                ownerNameText = snapshot.val().name;
            }).then(function() {
                var othernameref = firebase.database().ref("users/" + req.body.meetupsId);
                othernameref.once("value", function(snapshot){
                    otherNameText = snapshot.val().name;
                }).then(function(){
                    var info = {
                        id : meetupID,
                        courseName : courseNameText,
                        ownerID : id,
                        ownerName : ownerNameText,
                        otherID : hookupsId,
                        otherName : otherNameText,
                        date : date,
                        time : time,
                        details : details
                    };
                    //ref.set(info);
                    firebase.database().ref("users/" + req.body.id + "/PendingReply/" + meetupID).set(info);
                    firebase.database().ref("users/" + req.body.meetupsId + "/PendingResponse/" + meetupID).set(info);
                });
            });
            //var ownerRef = firebase.database().ref("users/" + req.body.id + "/PendingReply");
            //ownerRef.push(meetupID);
            //var otherRef = firebase.database().ref("users/" + req.body.meetupsId + "/PendingResponse");
            //.push(meetupID);
            res.status(200).json({message: "meetup added"});
        }
    },

    getPendingResponseMeetUps: (req, res, next) => {
        var id = req.body.id;
        var infoList = [];
        var ref = firebase.database().ref("users/" + req.body.id + "/PendingResponse");
        ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap){
                var obj = {
                    name : childsnap.val().ownerName,
                    courseName : childsnap.val().courseName,
                    description : childsnap.val().details,
                    date : childsnap.val().date,
                    time : childsnap.val().time
                }
                infoList.push(obj);
            });
        }).then(function() {
            res.status(200).json({info : infoList});
        });
    },

    getMeetUp: (req, res, next) => {
        //var id = req.body.id;
        var questionId = []
        var courseName = []
        var id = []
        var date = []
        var time = []
        var details = []

        var ref = firebase.database().ref("meetUps/" + req.body.id);

        ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap) {
                var list = childsnap.val();
               for (var key in list) {
               console.log(list[key].courseName);
               questionId.push(list[key].questionId);
               courseName.push(list[key].courseName);
               id.push(list[key].id);
               date.push(list[key].date);
               time.push(list[key].time);
               details.push(list[key].details);
            }

            });
            res.status(200).json({
                "questionId":questionId,
                "courseName":courseName,
                "id":id,
                "date":date,
                "time":time,
                "details":details
            });
         });

    },
    deleteMeetup: (req, res, next) => {
        var questionId = req.body.questionId;
        var id = req.body.id;

        var ref = firebase.database().ref("meetUps/" + req.body.id + "/" + questionId);
        ref.remove()




    }
}
