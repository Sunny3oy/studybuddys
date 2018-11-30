const firebase = require('firebase');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {

    helloWorld: (req, res, next) =>{
        var text = encrypt("Hello World");
        console.log(text)
        res.status(200).json({message: decrypt(text)});
    },
   //Pre: user is logged in.
   // this will take in the current course and question

   //Post: question is stored in the backend under the course
   createQuestion: (req, res, next) =>{
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
         nameRef.once("value", function(snapshot) {
            ref.set
            ({"question" : question,
            "userID": req.body.id,
            "id" : ref.key,
            "name" : snapshot.val()});
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
            });
         })
      }
   },

   getSingleQuestion: (req, res, next) =>{
      if(req.body.courseName === undefined){
         res.status(400).json({message: "Missing course name"});
      }
      else if(req.body.questionID === undefined){
         res.status(400).json({message: "Missing questionID"});
      }
      else{
         var courseName = req.body.courseName;
         var questionID = req.body.questionID;
         var ref = firebase.database().ref("MCourseQuestions/" + courseName + "/" + questionID);
         ref.once("value", function(snapshot){
            res.status(200).json({
               name : snapshot.val().name,
               question : snapshot.val().question
            })
         })
      }
   },
   //pre: User is logged in
   //takes in the current course,text for reply,question, posterID
   //post: posts a reply to a question that will be stored in the backend.
   submitAnswer: (req, res, next) =>{
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
         nameRef.once("value", function(snapshot) {
            ref.push
            ({"reply" : reply,
            "userID": req.body.id,
            "name" : snapshot.val()});
         });
         res.status(200).json({message: "reply added"});
      }

   },

   getReplies: (req, res, next) =>{
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
