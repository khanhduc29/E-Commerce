const router = require('express').Router();
const controller = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/registerUser', controller.registerUser )
router.post('/login', controller.login)
router.get('/getCurrent',verifyAccessToken, controller.getCurrent)
router.post('/refreshtoken', controller.refreshAccessToken)
router.get('/logout', controller.logout)
router.get('/forgotpassword', controller.forgotPassword)
router.put('/resetpassword', controller.resetPassword)
router.put('/address', verifyAccessToken, controller.updateUserAddress)

router.get('/getusers',verifyAccessToken, isAdmin, controller.getUsers)
router.delete('/deleteuser', verifyAccessToken, isAdmin, controller.deleteUser)
router.put('/updateuser',verifyAccessToken, controller.updateUser)
router.put('/cart', verifyAccessToken, controller.updateUserCart)

router.put('/updateuserbyadmin/:uid', verifyAccessToken, isAdmin, controller.updateUserByAdmin)

module.exports = router


// create : POST
// read : GET
// update : PUT
//  delete : DELETE
// as