const testFolder = './CUNY/';
const fs = require('fs');

module.exports = {
    getSubjects: (req, res, next) => {
      if(req.body.collegeName === undefined){
         res.status(400).json({message : "Missing collegeName"});
      }
      else{
         var college = req.body.collegeName;
         var files = fs.readdirSync('./CUNY/' + college);
         res.status(200).json({subjects : files});
      }
    },

    getSections: (req, res, next) => {
      if(req.body.collegeName === undefined){
         res.status(400).json({message : "Missing collegeName"});
      }
      else if(req.body.subjectName === undefined){
         res.status(400).json({message : "Missing subjectName"});
      }
      else{
         var college = req.body.collegeName;
         var subject = req.body.subjectName;
         var contents = fs.readFileSync('./CUNY/' + college + '/' + subject + '/courses.txt', 'utf8');
         var results = contents.split("\n");
         if(results[results.length - 1] == ""){
            results.length = results.length - 1
         }
         res.status(200).json({sections : results});
      }
    }
}
