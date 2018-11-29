const userDataController = require('./../controller/meetUp.ctrl')

module.exports = (router) => {
    router
    .route('/createMeetUp') // function url used by frontend
    .post(userDataController.createMeetUp) // function type [GET PUSH DELETE] and reference

    router
    .route('/getUseremail')
    .post(userDataController.getMeetUp)

}