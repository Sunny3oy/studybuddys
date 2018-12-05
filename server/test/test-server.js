var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var firebase = require('firebase');
var assert = require('assert');

chai.use(chaiHttp);

describe('getUsername', function() {
    it('should return username Test with correct uid passed', function(done) {
        chai.request(server)
        .post('/api/getUsername')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1"
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
    it('should return an error message saying missing user ID ', function(done) {
        chai.request(server)
        .post('/api/getUsername')
        .send({})
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            assert(res.body.message, "Missing user ID");
            done();
        });
    });
    it('should return an error message with incorrect uid', function(done) {
        chai.request(server)
        .post('/api/getUsername')
        .send({
           id : "123"
        })
        .end(function(err, res){
            res.should.be.json;
            res.body.should.have.property('name');
            should.not.exist(res.body.name);
            done();
        });
    });
});

describe('getUseremail', function() {
    it('should return email test@email.com', function(done) {
        chai.request(server)
        .post('/api/getUseremail')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1"
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

    it('should return an error message with incorrect uid', function(done) {
        chai.request(server)
        .post('/api/getUseremail')
        .send({
           id : "123"
        })
        .end(function(err, res){
            res.should.be.json;
            res.body.should.have.property('email');
            should.not.exist(res.body.email);
            done();
        });
    });
});

describe('addCourses', function() {
    it('should add a class to the array and should return a success message', function(done) {
        chai.request(server)
        .post('/api/addCourses')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1",
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
});

describe('getUserCourses', function() {
    it('should return an array with a list containing course math', function(done) {
        chai.request(server)
        .post('/api/getUserCourses')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('courseList');
            res.body.courseList.should.be.a('array');
            assert(res.body.courseList, ['math']);
            done();
        });
    });
});

describe('deleteUserCourses', function() {
    it('should delete a class and should return a success message', function(done) {
        chai.request(server)
        .post('/api/deleteUserCourses')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1",
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
});

describe('getUserCourses', function() {
    it('should return an empty array', function(done) {
        chai.request(server)
        .post('/api/getUserCourses')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('courseList');
            res.body.courseList.should.be.a('array');
            assert(res.body.courseList, []);
            done();
        });
    });
});

describe('updateSocialMedia', function() {
    it('should update a users list of social media urls', function(done) {
        chai.request(server)
        .post('/api/updateSocialMedia')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1",
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
});

describe('getSocialMedia', function() {
    it('should return an array with the list of links for the users social media', function(done) {
        chai.request(server)
        .post('/api/getSocialMedia')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('urlList');
            res.body.urlList.should.be.a('array');
            assert(res.body.urlList, ['www.facebook.com', 'www.linkedin.com', 'www.instagram.com']);
            done();
        });
    });
});

describe('deleteSocialMedia', function() {
    it('should delete the facebook url and should return a success message', function(done) {
        chai.request(server)
        .post('/api/deleteSocialMedia')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1",
            url : "facebook"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            done();
        });
    });
});

describe('getSocialMedia', function() {
    it('should return an array with the list of links for the users social media with facebook being empty', function(done) {
        chai.request(server)
        .post('/api/getSocialMedia')
        .send({
            id : "s4w1QclKq1a8vaPRXQaRZ0ldQYq1"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('urlList');
            res.body.urlList.should.be.a('array');
            assert(res.body.urlList, ['', 'www.linkedin.com', 'www.instagram.com']);
            done();
        });
    });
});

describe('getSubjects', function() {
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
});

describe('getSections', function() {
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
