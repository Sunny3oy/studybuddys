const firebase = require('firebase');

module.exports = {
    //Pre: user is logged in.
    // this will take in the current course and question

    //Post: question is stored in the backend under the course
    createQuestion: (req, res, next) =>{
        var user = firebase.auth().currentUser;
        var courseName = req.body.courseName;
        var question = req.body.userQuestion;
        var ref = firebase.database().ref("Courses/" + courseName);

        ref.push({"question" : question,
          "uid": user.uid,
        });

        res.status(200).json({message: "question added"});

    },
    deleteQuestion: (req, res, next) =>{

    },
    //pre: should pass in the course name
    //post: returns all the questions for the course if any along with the uid that made the questions
    getQuestions: (req, res, next) =>{
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

    },

    sumbitAnswer: (req, res, next) =>{

    }
}