const testFolder = './CUNY/';
const fs = require('fs');

module.exports = {
    getCourses: (req, res, next) => {
        var courses = [];
        if((req.body.schoolName == "CUNY Baruch") && (req.body.subject == "math")){
            courses = ["MTH 2120-GOR","MTH 2140-HMWA","MTH 2140-STRA","MTH 2160-SMWA","MTH 2160-KMWA","MTH 3905-RID","MTH 3906-RID","MTH 3907-RID","MTH 3908-RID","MTH 3909-HOW","MTH 3910-HOW","MTH 3911-HOW","MTH 3912-HOW","MTH 4000-HTRA","MTH 4009-2FTR","MTH 4010-PMWA","MTH 4010-EMWA","MTH 4130-HMWA","MTH 4421-STRA","MTH 4430-JMWA","MTH 4451-SMWA","MTH 4500-STRA","MTH 4500-KTRA"];
        }
        else if((req.body.schoolName == "CUNY CCNY") && (req.body.subject == "csc" || req.body.subject == "cs")){
            courses = ["CSC 10000-6XX","CSC 10200-CC1","CSC 10200-CC3","CSC 10200-CC2","CSC 10200-CC4","CSC 10200-MM1","CSC 10200-MM3","CSC 10200-MM2","CSC 10300-CC2","CSC 10300-CC3","CSC 10300-CC1","CSC 10300-MM2","CSC 10300-MM1","CSC 10300-MM3","CSC 10400-PR","CSC 10400-PR2","CSC 10400-AB","CSC 10400-EF2","CSC 10400-EF","CSC 11300-2L","CSC 11300-2N","CSC 21000-E","CSC 21000-F","CSC 21100-MM2"];
        }
        else if((req.body.schoolName == "CUNY CCNY") && (req.body.subject == "math")){
            courses = ["MATH 15000-M","MATH 15000-L","MATH 17300-CD","MATH 17300-*EC","MATH 18000-PR","MATH 18500-AB","MATH 18500-GH","MATH 18504-4CWE","MATH 19000-*EC","MATH 19000-RS","MATH 19000-ST","MATH 19000-LM","MATH 19000-PR","MATH 19000-CD","MATH 19000-SEK","MATH 19500-GH","MATH 19500-PR","MATH 19500-FG","MATH 19500-EF","MATH 19500-*EC2","MATH 19500-BC","MATH 19500-RS","MATH 19500-SEK","MATH 20100-GH"];
        }
        else if((req.body.schoolName == "CUNY CCNY") && (req.body.subject == "engl" || req.body.subject == "eng" || req.body.subject == "english")){
            courses = ["ENGL 11000-*CN2","ENGL 11000-P","ENGL 11000-L","ENGL 11000-B","ENGL 11000-D","ENGL 11000-E","ENGL 11000-*CN","ENGL 21001-P2","ENGL 21001-L","ENGL 21001-M","ENGL 21001-G","ENGL 21001-D","ENGL 21001-E","ENGL 21001-B","ENGL 21001-R","ENGL 21001-P","ENGL 21001-*EC2","ENGL 21001-*EC","ENGL 21002-D2","ENGL 21002-E","ENGL 21002-D","ENGL 21002-B","ENGL 21002-L","ENGL 21002-K"];
        }
        else if((req.body.schoolName == "CUNY CCNY") && (req.body.subject == "me")){
            courses = ["ME 14500-3EF","ME 14500-5EF","ME 14500-5AD","ME 14500-6XX","ME 24600-C","ME 24600-C2","ME 24700-B2","ME 24700-B","ME 31100-1EF","ME 31100-1GH","ME 31100-3GH","ME 32200-2PR","ME 32200-4PR","ME 32200-5AD","ME 33000-KL2","ME 33000-KL","ME 35600-D","ME 35600-D2","ME 37100-1GH","ME 37100-1EF","ME 37100-3GH","ME 40100-1EF","ME 41100-3EF","ME 41100-5EF"];
        }
        else if((req.body.schoolName == "CUNY CCNY") && (req.body.subject == "phys" || req.body.subject == "physics" || req.body.subject == "phy")){
            courses = ["PHYS 20300-*CH","PHYS 20300-GH2","PHYS 20300-GH","PHYS 20300-GH3","PHYS 20300-LM","PHYS 20300-LM2","PHYS 20300-LM3","PHYS 20400-ST","PHYS 20400-ST3","PHYS 20400-ST2","PHYS 20400-ST5","PHYS 20400-ST4","PHYS 20400-PR","PHYS 20400-PR2","PHYS 20400-PR3","PHYS 20700-*CH","PHYS 20700-KK","PHYS 20700-CD4","PHYS 20700-CD2","PHYS 20700-CD3","PHYS 20700-GH","PHYS 20700-GH3","PHYS 20700-CD","PHYS 20700-GH2"];
        }
        else if((req.body.schoolName == "CUNY Baruch") && (req.body.subject == "engl" || req.body.subject == "eng" || req.body.subject == "english")){
            courses = ["ENG 2100-KMWB","ENG 2100T-BMWA","ENG 2100-SMWA","ENG 2100-HMWA","ENG 2100-HMWB","ENG 2100-GMWA","ENG 2100-CNOW","ENG 2100-HTRA","ENG 2100-KTRA","ENG 2100-STRA","ENG 2100-JMWB","ENG 2100-JMWA","ENG 2100-KTRB","ENG 2100T-CMWA","ENG 2100T-BTRA","ENG 2150-HMWG","ENG 2150-HMWF","ENG 2150-HMWE","ENG 2150-HMWB","ENG 2150-HMWA","ENG 2150-GTRF","ENG 2150-GTRG","ENG 2150-GTRA","ENG 2150-GTRB"];
        }
        else if((req.body.schoolName == "CUNY Baruch") && (req.body.subject == "cis" || req.body.subject == "csc" || req.body.subject == "cs")){
            courses = ["CIS 2200-RMWA","CIS 2200-DMWA","CIS 2200-ETRA","CIS 2200H-FTRA","CIS 2200-PMWA","CIS 2200-MNF","CIS 2200-ETA","CIS 2200-CTRA","CIS 2200-LMFA","CIS 2200-MNSA","CIS 2200-BTRA","CIS 2200-JAND","CIS 2200-AMW","CIS 2200-MFA","CIS 2200-CMWA","CIS 2200-PTRA","CIS 2200-ATRA","CIS 2200-BMWA","CIS 2200-QMWA","CIS 2200-LMSA","CIS 2200-QTRA","CIS 2200-EMWA","CIS 3100-QTRA","CIS 3100-EWA"];
        }
        else if((req.body.schoolName == "CUNY York") && (req.body.subject == "math")){
            courses = ["MATH 102-ABSK","MATH 104-HG","MATH 104-SV","MATH 104-PQ","MATH 104-RQ","MATH 104-EGH","MATH 104-TW","MATH 104-JK","MATH 104-YY","MATH 104-2AB","MATH 111-GH","MATH 111-Z","MATH 111-Y","MATH 111-SV","MATH 111-EF","MATH 111-TTW","MATH 111-DC","MATH 111-AML","MATH 111-CD","MATH 111-MN2","MATH 111-MN1","MATH 111-PQ","MATH 111-2AB","MATH 115-BA"];
        }
        else if((req.body.schoolName == "CUNY York") && (req.body.subject == "engl" || req.body.subject == "eng" || req.body.subject == "english")){
            courses = ["ENG 125-MN2","ENG 125-MN1","ENG 125-GH","ENG 125-DC","ENG 125-EF","ENG 125-CD","ENG 125-RQ","ENG 125-SV","ENG 125-AB","ENG 125-LM1","ENG 125-PQ","ENG 126-PQSK","ENG 126-TW2","ENG 126-Y","ENG 126-FESK","ENG 126-MNSK","ENG 126-EF4","ENG 126-EF1","ENG 126-EF3","ENG 126-EF2","ENG 126-AB1","ENG 126-AB3","ENG 126-AB2","ENG 126-HG"];
        }
        else if((req.body.schoolName == "CUNY York") && (req.body.subject == "cs" || req.body.subject == "csc")){
            courses = ["CS 172-MN","CS 172-EF","CS 172-2AB","CS 291-RQ","CS 291-GH","CS 292-PQ","CS 300-TBA1","CS 301-TBA","CS 334-RQ","CS 341-PQ","CS 341-CD","CS 351-CD","CS 357-TW","CS 361-SV","CS 377-GH","CS 397-JK","CS 400-TBA","CS 401-TBA","CS 451-SV","CS 451-PQ","CS 452-PQ","CS 457-EF","CS 461-MN","CS 465-AB"];
        }
        else if((req.body.schoolName == "CUNY Queens") && (req.body.subject == "math")){
            courses = ["MATH 110-01","MATH 110-02","MATH 110-03","MATH 110-04","MATH 110-05M","MATH 110-06","MATH 110-07","MATH 110-08","MATH 114W-01","MATH 115-01","MATH 115-02","MATH 115-03","MATH 115-04","MATH 115-05","MATH 115-06","MATH 115-07","MATH 115-08","MATH 115-09","MATH 115-10","MATH 115-11","MATH 115-12","MATH 115-13","MATH 115-14","MATH 115-15"];
        }
        else if((req.body.schoolName == "CUNY Queens") && (req.body.subject == "engl" || req.body.subject == "eng" || req.body.subject == "english")){
            courses = ["ENGL 95-01","ENGL 110-CN02","ENGL 110-CN01","ENGL 110-01","ENGL 110-02","ENGL 110-03","ENGL 110-04","ENGL 110-05","ENGL 110-07","ENGL 110-08","ENGL 110-09","ENGL 110-10","ENGL 110-12","ENGL 110-13","ENGL 110-14","ENGL 110-15","ENGL 110-16","ENGL 110-17","ENGL 110-18","ENGL 110-20","ENGL 110-21","ENGL 110-22","ENGL 110-23","ENGL 110-26SK"];
        }
        else if((req.body.schoolName == "CUNY Queens") && (req.body.subject == "csci" || req.body.subject == "cs" || req.body.subject == "csc")){
            courses = ["CSCI 12-21","CSCI 12-21A","CSCI 12-21C","CSCI 12-21B","CSCI 12-21E","CSCI 12-21D","CSCI 12-21F","CSCI 12-42","CSCI 12-42A","CSCI 48-11","CSCI 48-11A","CSCI 48-11C","CSCI 48-11B","CSCI 48-32","CSCI 48-32B","CSCI 48-32A","CSCI 48-33","CSCI 48-33A","CSCI 48-44","CSCI 48-44A","CSCI 80-31","CSCI 80-31A","CSCI 81-32","CSCI 85-33"];
        }
        else{
            courses = ["Courses can not be found or will be added later."];
        }
        res.status(200).json({courseID : courses});
    },
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
