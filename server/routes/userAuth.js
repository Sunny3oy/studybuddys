const userAuthController = require('./../controller/userAuth.ctrl')

module.exports = (router) => {
    router
    .route('/signUp') // function url used by frontend
    .post(userAuthController.createUser) // function type [GET PUSH DELETE] and reference

    router
    .route('/logIn')
    .post(userAuthController.logInUser)

    router
    .route('/logout')
    .get(userAuthController.logout)

    router
    .route('/checkLoggedIn')
    .get(userAuthController.checkLoggedIn)

}
