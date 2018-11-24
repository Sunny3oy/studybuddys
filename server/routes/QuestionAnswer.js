const QuestionAnswerController = require('./../controller/QuestionAnswer.ctrl')

module.exports = (router) => {
    router
    .route('/McreateQuestion') // function url used by frontend
    .post(QuestionAnswerController.McreateQuestion) // function type [GET PUSH DELETE] and reference

    router
    .route('/deleteQuestion') // function url used by frontend
    .post(QuestionAnswerController.deleteQuestion)

    router
    .route('/MgetQuestions') // function url used by frontend
    .post(QuestionAnswerController.MgetQuestions)

    router
    .route('/MgetSingleQuestion') // function url used by frontend
    .post(QuestionAnswerController.MgetSingleQuestion)

    router
    .route('/MsubmitAnswer') // function url used by frontend
    .post(QuestionAnswerController.MsubmitAnswer)

    router
    .route('/MgetReplies') // function url used by frontend
    .post(QuestionAnswerController.MgetReplies)
}
