const QuestionAnswerController = require('./../controller/QuestionAnswer.ctrl')

module.exports = (router) => {
    router
    .route('/createQuestion') // function url used by frontend
    .post(QuestionAnswerController.createQuestion) // function type [GET PUSH DELETE] and reference

    router
    .route('/deleteQuestion') // function url used by frontend
    .post(QuestionAnswerController.deleteQuestion)

    router
    .route('/getQuestions') // function url used by frontend
    .post(QuestionAnswerController.getQuestions)

    router
    .route('/sumbitAnswer') // function url used by frontend
    .post(QuestionAnswerController.sumbitAnswer)

    router
    .route('/getReplies') // function url used by frontend
    .post(QuestionAnswerController.getReplies)
}

