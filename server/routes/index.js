// makes connection with router

// as more route files get created they need to be added to the router 
const userAuthentication = require('./userAuth')
const userData = require('./userData')

module.exports = (router) => {
    userAuthentication(router)
    userData(router)

}
