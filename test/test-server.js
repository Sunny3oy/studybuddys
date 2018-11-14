var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var firebase = require('firebase');

chai.use(chaiHttp);

describe('logIn', function() {
    it('should return a bad logIn with incorrect information', function(done) {
        chai.request(server)
        .post('/api/logIn')
        .send({
            email : "matthew@email.com",
            password : "1234567"
        })
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('checkLoggedIn', function() {
    it('should return false since no user is logged in', function(done) {
        chai.request(server)
        .get('/api/checkLoggedIn')
        .end(function(err, res){
            res.should.be.json;
            res.body.should.have.property('loggedIn');
            res.body.loggedIn.should.be.a('boolean');
            console.log(res.body.loggedIn);
            done();
        });
    });
});

describe('getUsername', function() {
    it('should return an error since no user is logged in', function(done) {
        chai.request(server)
        .get('/api/getUsername')
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('getEmail', function() {
    it('should return an error since no user is logged in', function(done) {
        chai.request(server)
        .get('/api/getUseremail')
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('getUserCourses', function() {
    it('should return an error since no user is logged in', function(done) {
        chai.request(server)
        .get('/api/getUserCourses')
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('addCourses', function() {
    it('should return an error since no user is logged in', function(done) {
        chai.request(server)
        .post('/api/addCourses')
        .send({
            courseName : "Math"
        })
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('deleteUserCourses', function() {
    it('should return an error since no user is logged in', function(done) {
        chai.request(server)
        .post('/api/deleteUserCourses')
        .send({
            courseName : "Math"
        })
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('logIn', function() {
    it('should return a successful logIn with correct information', function(done) {
        chai.request(server)
        .post('/api/logIn')
        .send({
            email : "matthew@email.com",
            password : "123456"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('checkLoggedIn', function() {
    it('should return true since no user is logged in', function(done) {
        chai.request(server)
        .get('/api/checkLoggedIn')
        .end(function(err, res){
            res.should.be.json;
            res.body.should.have.property('loggedIn');
            res.body.loggedIn.should.be.a('boolean');
            console.log(res.body.loggedIn);
            done();
        });
    });
});

describe('getUsername', function() {
    it('should return the username of user who is logged in', function(done) {
        chai.request(server)
        .get('/api/getUsername')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('name');
            res.body.name.should.be.a('string');
            console.log(res.body.name);
            done();
        });
    });
});

describe('getEmail', function() {
    it('should return the user email', function(done) {
        chai.request(server)
        .get('/api/getUseremail')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('email');
            res.body.email.should.be.a('string');
            console.log(res.body.email);
            done();
        });
    });
});

describe('addCourses', function() {
    it('should return a success message', function(done) {
        chai.request(server)
        .post('/api/addCourses')
        .send({
            courseName : "Math"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('getUserCourses', function() {
    it('should return array containing course Math', function(done) {
        chai.request(server)
        .get('/api/getUserCourses')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('courseList');
            res.body.courseList.should.be.a('array');
            console.log(res.body.courseList);
            done();
        });
    });
});

describe('deleteUserCourses', function() {
    it('should return a success message', function(done) {
        chai.request(server)
        .post('/api/deleteUserCourses')
        .send({
            courseName : "Math"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('logOut', function() {
    it('should return a successful logout ', function(done) {
        chai.request(server)
        .get('/api/logout')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('checkLoggedIn', function() {
    it('should return false since no user is logged in', function(done) {
        chai.request(server)
        .get('/api/checkLoggedIn')
        .end(function(err, res){
            res.should.be.json;
            res.body.should.have.property('loggedIn');
            res.body.loggedIn.should.be.a('boolean');
            console.log(res.body.loggedIn);
            done();
        });
    });
});

describe('create user', function() {
    it('should return an error since user already exists', function(done) {
        chai.request(server)
        .post('/api/signUp')
        .send({
            name : "matthew",
            email : "matthew@email.com",
            password : "123456"
        })
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('create user', function() {
    it('should return an error since user already exists', function(done) {
        chai.request(server)
        .post('/api/signUp')
        .send({
            name : "test",
            email : "test@email.com",
            password : "123"
        })
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('create user', function() {
    it('Should return a success message. This can only be ran once before having to delete user in database', function(done) {
        chai.request(server)
        .post('/api/signUp')
        .send({
            name : "test",
            email : "test@email.com",
            password : "123456"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('createQuestion', function() {
    it('Should return a success message.', function(done) {
        chai.request(server)
        .post('/api/createQuestion')
        .send({
            courseName : "csc101",
            userQuestion : "How do I print hello world?"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            console.log(res.body.message);
            done();
        });
    });
});

describe('getQuestion', function() {
    it('Should return a json.', function(done) {
        chai.request(server)
        .post('/api/getQuestion')
        .send({
            courseName : "csc101"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('questions');
            res.body.questions.should.be.a('array');
            console.log(res.body.uid);
            done();
        });
    });
});