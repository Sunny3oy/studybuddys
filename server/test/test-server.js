var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var firebase = require('firebase');
var assert = require('assert');

chai.use(chaiHttp);

describe('getUsername', function() {
   it('should return username Test', function(done) {
      chai.request(server)
      .post('/api/getUsername')
      .send({
         id : "yopRBY8GtqNRCTbQnvS3bQCMD413"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('name');
         res.body.name.should.be.a('string');
         assert(res.body.name, "Test");
         done();
      });
   });

   it('should return email test@email.com', function(done) {
      chai.request(server)
      .post('/api/getUseremail')
      .send({
         id : "yopRBY8GtqNRCTbQnvS3bQCMD413"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('email');
         res.body.email.should.be.a('string');
         assert(res.body.email, "test@email.com");
         done();
      });
   });

   it('should return an array with the list of user courses', function(done) {
      chai.request(server)
      .post('/api/getUserCourses')
      .send({
         id : "yopRBY8GtqNRCTbQnvS3bQCMD413"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('courseList');
         res.body.courseList.should.be.a('array');
         done();
      });
   });

   it('should add a class to the array and should return a success message', function(done) {
      chai.request(server)
      .post('/api/addCourses')
      .send({
         id : "yopRBY8GtqNRCTbQnvS3bQCMD413",
         courseName : "math"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('message');
         res.body.message.should.be.a('string');
         done();
      });
  });

  it('should delete a class and should return a success message', function(done) {
     chai.request(server)
     .post('/api/deleteUserCourses')
     .send({
        id : "yopRBY8GtqNRCTbQnvS3bQCMD413",
        courseName : "math"
     })
     .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        done();
     });
  });

  it('should return an array with the list of links for the users social media', function(done) {
     chai.request(server)
     .post('/api/getSocialMedia')
     .send({
        id : "yopRBY8GtqNRCTbQnvS3bQCMD413"
     })
     .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('urlList');
        res.body.urlList.should.be.a('array');
        done();
     });
  });

  it('should update a users list of social media urls', function(done) {
     chai.request(server)
     .post('/api/updateSocialMedia')
     .send({
        id : "yopRBY8GtqNRCTbQnvS3bQCMD413",
        urlList : {
            "facebook" : "www.facebook.com",
            "linkedin" : "www.linkedin.com",
            "instagram" : "www.instagram.com"
        }
     })
     .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        done();
     });
 });

 it('should delete an url and should return a success message', function(done) {
    chai.request(server)
    .post('/api/deleteSocialMedia')
    .send({
       id : "yopRBY8GtqNRCTbQnvS3bQCMD413",
       url : "https://www.github.com"
    })
    .end(function(err, res){
       res.should.have.status(200);
       res.should.be.json;
       res.body.should.have.property('message');
       res.body.message.should.be.a('string');
       done();
    });
 });

   it('should return a list of subjects available at CCNY', function(done) {
      chai.request(server)
      .post('/api/getSubjects')
      .send({
         collegeName : "CTY01"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('subjects');
         res.body.subjects.should.be.a('array');
         done();
     });
   });

   it('should return a list of sections available at CCNY for subject Computer Science', function(done) {
      chai.request(server)
      .post('/api/getSections')
      .send({
         collegeName : "CTY01",
         subjectName : "Computer Science"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('sections');
         res.body.sections.should.be.a('array');
         done();
     });
   });
});

/*
describe('getUsersByCourseTaken', function() {
    it('Should return a json.', function(done) {
        chai.request(server)
        .post('/api/getUsersByCourseTaken')
        .send({
            courseName : "CSC 10000-6XX"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('users');
            res.body.questions.should.be.a('array');
            console.log(res.body.users);
            done();
        });
    });
});
*/
