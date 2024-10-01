const router = require('express').Router();
const controller = require('../controllers/user')
const {verifyAccessToken} = require('../middlewares/verifyToken')

router.post('/registerUser', controller.registerUser )
router.post('/login', controller.login)
router.get('/getCurrent',verifyAccessToken, controller.getCurrent)
router.post('/refreshtoken', controller.refreshAccessToken)

module.exports = router


// create : POST
// read : GET
// update : PUT
//  delete : DELETE
// as