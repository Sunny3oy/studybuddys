const courseDataController = require('./../controller/courseData.ctrl')

module.exports = (router) => {
    router
    .route('/getSubjects') // function url used by frontend
    .post(courseDataController.getSubjects) // function type [GET PUSH DELETE] and reference

    router
    .route('/getSections') // function url used by frontend
    .post(courseDataController.getSections) // function type [GET PUSH DELETE] and reference
}
