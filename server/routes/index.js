// makes connection with router

// as more route files get created they need to be added to the router
const userData = require('./userData')
const courseData = require('./courseData')
const QuestionAnswer = require('./QuestionAnswer')
const meetUp = require('./meetUp')

module.exports = (router) => {
    userData(router)
    courseData(router)
    QuestionAnswer(router)
    meetUp(router)
}
