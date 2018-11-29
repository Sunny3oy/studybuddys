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
        var courseName = req.body.courseName;


        var ref = firebase.database().ref("meetUps/" + hookupsId);

            ref.push({
                "questionId": ref.key,
                "courseName":courseName,
                "id":id,
                "date":date,
                "time":time,
                "details":details
            });
            res.status(200).json({message: "meetup added"});


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
               questionId.push(childsnap.val().questionId);
               courseName.push(childsnap.val().courseName);
               id.push(childsnap.val().id);
               date.push(childsnap.val().date);
               time.push(childsnap.val().time);
               details.push(childsnap.val().details);
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

    }
}