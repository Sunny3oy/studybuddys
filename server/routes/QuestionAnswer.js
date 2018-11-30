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
    .route('/getSingleQuestion') // function url used by frontend
    .post(QuestionAnswerController.getSingleQuestion)

    router
    .route('/submitAnswer') // function url used by frontend
    .post(QuestionAnswerController.submitAnswer)

    router
    .route('/getReplies') // function url used by frontend
    .post(QuestionAnswerController.getReplies)

    router
    .route('/helloWorld') // function url used by frontend
    .get(QuestionAnswerController.helloWorld)
}
