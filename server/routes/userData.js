const userDataController = require('./../controller/userData.ctrl')

module.exports = (router) => {
    router
    .route('/getUsername') // function url used by frontend
    .post(userDataController.getUsername) // function type [GET PUSH DELETE] and reference

    router
    .route('/getUseremail')
    .post(userDataController.getUseremail)

}