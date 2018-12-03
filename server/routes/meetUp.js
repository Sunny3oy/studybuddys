const userDataController = require('./../controller/meetUp.ctrl')

module.exports = (router) => {
    router
    .route('/createMeetUp') // function url used by frontend
    .post(userDataController.createMeetUp) // function type [GET PUSH DELETE] and reference

    router
    .route('/getPendingResponseMeetUps')
    .post(userDataController.getPendingResponseMeetUps)

    router
    .route('/getPendingReplyMeetUps')
    .post(userDataController.getPendingReplyMeetUps)

    router
    .route('/getApprovedMeetUps')
    .post(userDataController.getApprovedMeetUps)

    router
    .route('/getDeniedMeetUps')
    .post(userDataController.getDeniedMeetUps)

    router
    .route('/approveMeetup')
    .post(userDataController.approveMeetup)

    router
    .route('/denyMeetup')
    .post(userDataController.denyMeetup)

    router
    .route('/deleteMeetup')
    .post(userDataController.deleteMeetup)

}
