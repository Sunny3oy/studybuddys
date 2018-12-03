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
                    firebase.database().ref("users/" + req.body.id + "/PendingReply/" + meetupID).set(info);
                    firebase.database().ref("users/" + req.body.meetupsId + "/PendingResponse/" + meetupID).set(info);
                });
            });
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
                    meetupId : childsnap.val().id,
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

    getPendingReplyMeetUps: (req, res, next) => {
        var id = req.body.id;
        var infoList = [];
        var ref = firebase.database().ref("users/" + req.body.id + "/PendingReply");
        ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap){
                var obj = {
                    meetupId : childsnap.val().id,
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

    getApprovedMeetUps: (req, res, next) => {
        var id = req.body.id;
        var infoList = [];
        var ref = firebase.database().ref("users/" + req.body.id + "/ApprovedMeetUps");
        ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap){
                var obj = {
                    meetupId : childsnap.val().id,
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

    getDeniedMeetUps: (req, res, next) => {
        var id = req.body.id;
        var infoList = [];
        var ref = firebase.database().ref("users/" + req.body.id + "/DeniedMeetUps");
        ref.once("value", function(snapshot){
            snapshot.forEach(function (childsnap){
                var obj = {
                    meetupId : childsnap.val().id,
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

    approveMeetup: (req, res, next) => {
        var meetupId = req.body.meetupId;
        var id = req.body.id;
        firebase.database().ref("users/" + req.body.id + "/PendingResponse/" + req.body.meetupId).once('value').then(function(snapshot) {
            var obj = snapshot.val();
            if(obj != null){
                firebase.database().ref("users/" + req.body.id + "/PendingResponse/" + req.body.meetupId).remove();
                firebase.database().ref("users/" + req.body.id + "/ApprovedMeetUps/" + req.body.meetupId).set(obj);

                firebase.database().ref("users/" + obj.ownerID + "/PendingReply/" + req.body.meetupId).remove();
                firebase.database().ref("users/" + obj.ownerID + "/ApprovedMeetUps/" + req.body.meetupId).set(obj);
            }
            res.status(200).json({message: "meetup approved"});
        });
    },

    denyMeetup: (req, res, next) => {
        var meetupId = req.body.meetupId;
        var id = req.body.id;
        firebase.database().ref("users/" + req.body.id + "/PendingResponse/" + req.body.meetupId).once('value').then(function(snapshot) {
            var obj = snapshot.val();
            if(obj != null){
                firebase.database().ref("users/" + req.body.id + "/PendingResponse/" + req.body.meetupId).remove();
                firebase.database().ref("users/" + req.body.id + "/DeniedMeetUps/" + req.body.meetupId).set(obj);

                firebase.database().ref("users/" + obj.ownerID + "/PendingReply/" + req.body.meetupId).remove();
                firebase.database().ref("users/" + obj.ownerID + "/DeniedMeetUps/" + req.body.meetupId).set(obj);
            }
            res.status(200).json({message: "Meetup denied"});
        });
    },

    deleteMeetup: (req, res, next) => {
        var meetupId = req.body.meetupId;
        var id = req.body.id;
        firebase.database().ref("users/" + req.body.id + "/PendingResponse/" + req.body.meetupId).once('value').then(function(snapshot) {
            var obj = snapshot.val();
            if(obj == null){
                firebase.database().ref("users/" + req.body.id + "/ApprovedMeetUps/" + req.body.meetupId).once('value').then(function(snapshot) {
                    var obj2 = snapshot.val();
                    if(obj2 == null){
                        firebase.database().ref("users/" + req.body.id + "/DeniedMeetUps/" + req.body.meetupId).once('value').then(function(snapshot) {
                            var obj3 = snapshot.val();
                            firebase.database().ref("users/" + obj3.ownerID + "/DeniedMeetUps/" + req.body.meetupId).remove();
                            firebase.database().ref("users/" + obj3.otherID + "/DeniedMeetUps/" + req.body.meetupId).remove();
                        });
                    }
                    else{
                        firebase.database().ref("users/" + obj2.ownerID + "/ApprovedMeetUps/" + req.body.meetupId).remove();
                        firebase.database().ref("users/" + obj2.otherID + "/ApprovedMeetUps/" + req.body.meetupId).remove();
                    }
                });
            }
            else{
                firebase.database().ref("users/" + obj.ownerID + "/PendingReply/" + req.body.meetupId).remove();
                firebase.database().ref("users/" + obj.otherID + "/PendingResponse/" + req.body.meetupId).remove();
            }
        });
        res.status(200).json({message: "Meetup deleted"});
    }
}
