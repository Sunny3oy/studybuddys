// makes connection with router

// as more route files get created they need to be added to the router
const userAuthentication = require('./userAuth')
const userData = require('./userData')
const courseData = require('./courseData')
const QuestionAnswer = require('./QuestionAnswer')

module.exports = (router) => {
    userAuthentication(router)
    userData(router)
    courseData(router)
    QuestionAnswer(router)
}
