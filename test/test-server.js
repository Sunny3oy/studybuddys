var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var firebase = require('firebase');
var assert = require('assert');

chai.use(chaiHttp);

describe('getUsername', function() {
   it('should return username Matthew', function(done) {
      chai.request(server)
      .post('/api/getUsername')
      .send({
         id : "HnXfCHwV7xXZcsIsMgsKgl27CXG2"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('name');
         res.body.name.should.be.a('string');
         assert(res.body.name, "Matthew");
         done();
      });
   });

   it('should return email matthew@email.com', function(done) {
      chai.request(server)
      .post('/api/getUseremail')
      .send({
         id : "HnXfCHwV7xXZcsIsMgsKgl27CXG2"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('email');
         res.body.email.should.be.a('string');
         assert(res.body.email, "matthew@email.com");
         done();
      });
   });

   it('should return array with the list of user courses', function(done) {
      chai.request(server)
      .post('/api/getUserCourses')
      .send({
         id : "HnXfCHwV7xXZcsIsMgsKgl27CXG2"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('courseList');
         res.body.courseList.should.be.a('array');
         console.log(res.body.courseList)
         done();
      });
   });

   it('should add a class to the array and should return a success message', function(done) {
      chai.request(server)
      .post('/api/addCourses')
      .send({
         id : "HnXfCHwV7xXZcsIsMgsKgl27CXG2",
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
         id : "HnXfCHwV7xXZcsIsMgsKgl27CXG2",
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

   it('should return a list of csc courses', function(done) {
      chai.request(server)
      .post('/api/getCourses')
      .send({
         schoolName : "CUNY CCNY",
         subject : "csc"
      })
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.property('courseID');
         res.body.courseID.should.be.a('array');
         console.log(res.body.courseID);
         done();
      });
   });
});
