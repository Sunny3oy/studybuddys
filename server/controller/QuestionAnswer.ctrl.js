const firebase = require('firebase');

module.exports = {
    //Pre: user is logged in.
    // this will take in the current course and question

    //Post: question is stored in the backend under the course
    createQuestion: (req, res, next) =>{
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else if(req.body.userQuestion === undefined){
         res.status(400).json({message: "Missing user's question"});
      }
      else{
         var courseName = req.body.courseName;
         var question = req.body.userQuestion;
         var ref = firebase.database().ref("CoursesQuestions/" + courseName);
         var refreply = firebase.database().ref("QuestionReply/" + courseName +"/"+ req.body.id);

         refreply.push({
           "question":question,
            "reply": ""
        });

         ref.push
         ({"question" : question,
           "uid": req.body.id,
         });
         res.status(200).json({message: "question added"});
      }
    },

    McreateQuestion: (req, res, next) =>{
      if(req.body.id === undefined){
         res.status(400).json({message: "Missing id"});
      }
      else if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing courseName"});
      }
      else if(req.body.userQuestion === undefined){
         res.status(400).json({message: "Missing userQuestion"});
      }
      else{
         var courseName = req.body.courseName;
         var question = req.body.userQuestion;

         // Find name
         var name = "";
         var ref = firebase.database().ref("MCourseQuestions/" + courseName).push();
         var nameRef = firebase.database().ref("users/" + req.body.id + "/name");
         nameRef.on("value", function(snapshot) {
             ref.set
             ({"question" : question,
               "userID": req.body.id,
               "id" : ref.key,
               "name" : snapshot.val()
             });
         });
         res.status(200).json({message: "question added"});
      }
    },

    deleteQuestion: (req, res, next) =>{

    },
    //pre: should pass in the course name
    //post: returns all the questions for the course if any along with the uid that made the questions
    getQuestions: (req, res, next) =>{
      if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else{
         var courseName = req.body.courseName;
         var ref = firebase.database().ref("Courses/" + courseName);
         var questions = [];
         var user = [];
         ref.once("value", function(snapshot){
             var list = snapshot.val()
             for(var key in list){
                 var Q = list[key].question;
                 var u = list[key].uid;
                 questions.push(Q);
                 user.push(u);
             }
             res.status(200).json
                 ({"questions": questions,
                     "users": user
                 });
             });
      }

    },

    MgetQuestions: (req, res, next) =>{
      if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else{
          var courseName = req.body.courseName;
          var namesList = [];
          var questionsList = [];
          var idsList = [];
          var ref = firebase.database().ref("MCourseQuestions/" + courseName);
          ref.once("value", function(snapshot){
              snapshot.forEach(function (childsnap){
                  namesList.push(childsnap.val().name);
                  questionsList.push(childsnap.val().question);
                  idsList.push(childsnap.val().id);
              })
              res.status(200).json({
                  names : namesList,
                  questions : questionsList,
                  ids : idsList
              })
          })
      }
    },
    //pre: User is logged in
    //takes in the current course,text for reply,question, posterID
    //post: posts a reply to a question that will be stored in the backend.
    sumbitAnswer: (req, res, next) =>{
        if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course Name"});
      }
      else if(req.body.replyText === undefined){
         res.status(400).json({message: "Missing user's reply Text"});
      }
      else if(req.body.questionText === undefined){
         res.status(400).json({message: "Missing question text"});
      }
      else if(req.body.useridQuestion === undefined){
         res.status(400).json({message: "Missing the userID of the person who posted the question"});
      }
      else {
            var user = req.body.id;
            var courseName = req.body.courseName;
            var replyText = req.body.replyText;
            var questionText = req.body.questionText;
            var useridQuestion = req.body.useridQuestion;
            var refreply = firebase.database().ref("QuestionReply/" + courseName + "/" + useridQuestion);

            refreply.once("value", function (snapshot) {
                snapshot.forEach(function (childsnap) {
                    console.log(childsnap.val().question);
                    if (childsnap.val().question === questionText) {
                        firebase.database().ref("QuestionReply/" + courseName + "/" + useridQuestion + "/" + childsnap.key + "/reply/").push({
                            "reply": replyText,
                            "replierUID": user
                        });
                    }
                });
            });

            res.status(200).json({message: "reply added"});
        }

    },

    MsubmitAnswer: (req, res, next) =>{
        if(req.body.id === undefined){
         res.status(400).json({message: "Missing id"});
      }
      else if(req.body.replyText === undefined){
         res.status(400).json({message: "Missing replyText"});
      }
      else if(req.body.questionID === undefined){
         res.status(400).json({message: "Missing questionID"});
      }
      else {
          var reply = req.body.replyText;
          var name = "";
          var ref = firebase.database().ref("MCourseReplies/" + req.body.questionID);
          var nameRef = firebase.database().ref("users/" + req.body.id + "/name");
          nameRef.on("value", function(snapshot) {
              ref.push
              ({"reply" : reply,
                "userID": req.body.id,
                "name" : snapshot.val()
              });
          });
          res.status(200).json({message: "reply added"});
      }

    },

    getReplies: (req, res, next) =>{
        if(req.body.id === undefined){
         res.status(400).json({message: "Missing user ID"});
      }
      else if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course Name"});
      }
      else if(req.body.questionText === undefined){
         res.status(400).json({message: "Missing question text"});
      }
      else if(req.body.useridQuestion === undefined){
         res.status(400).json({message: "Missing the userID of the person who posted the question"});
      }
      else {
            var user = req.body.id;
            var courseName = req.body.courseName;
            var questionText = req.body.questionText;
            var useridQuestion = req.body.useridQuestion;
            var replies = [];
            var userids = [];
            var refreply = firebase.database().ref("QuestionReply/" + courseName + "/" + useridQuestion);
            refreply.once("value", function (snapshot) {
                snapshot.forEach(function (childsnap) {
                    console.log(childsnap.val().question);
                    if (childsnap.val().question === questionText) {
                        var newref = firebase.database().ref("QuestionReply/" + courseName + "/" + useridQuestion + "/" + childsnap.key + "/reply/");
                        newref.once("value", function(snapshot){
                        var list = snapshot.val()
                        for(var key in list){
                            var R = list[key].reply;
                            var uid = list[key].replierUID;
                            replies.push(R);
                            userids.push(uid);
                        }
                        res.status(200).json
                            ({"replies": replies,
                                "userids": userids
                            });
                        });
                    }
                });
            });
        }
    },

    MgetReplies: (req, res, next) =>{
        if(req.body.questionID === undefined){
            res.status(400).json({message: "Missing questionID"});
        }
        else {
            var questionID = req.body.questionID;
            var namesList = [];
            var repliesList = [];
            var ref = firebase.database().ref("MCourseReplies/" + questionID);
            ref.once("value", function(snapshot){
                snapshot.forEach(function (childsnap){
                    namesList.push(childsnap.val().name);
                    repliesList.push(childsnap.val().reply);
                })
                res.status(200).json({
                    names : namesList,
                    replies : repliesList
                })
            })
        }
    }
}
