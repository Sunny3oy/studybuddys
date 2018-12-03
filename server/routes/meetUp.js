const userDataController = require('./../controller/meetUp.ctrl')

module.exports = (router) => {
    router
    .route('/createMeetUp') // function url used by frontend
    .post(userDataController.createMeetUp) // function type [GET PUSH DELETE] and reference

    router
    .route('/getMeetUp')
    .post(userDataController.getMeetUp)

    router
    .route('/deleteMeetup')
    .post(userDataController.deleteMeetup)

    router
    .route('/getPendingResponseMeetUps')
    .post(userDataController.getPendingResponseMeetUps)

}
