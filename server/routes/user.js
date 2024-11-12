const router = require('express').Router();
const controller = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config');

router.post('/registerUser', controller.registerUser )
router.post('/login', controller.login)
router.get('/getCurrent',verifyAccessToken, controller.getCurrent)
router.post('/refreshtoken', controller.refreshAccessToken)
router.get('/logout', controller.logout)
router.get('/forgotpassword', controller.forgotPassword)
router.put('/resetpassword', controller.resetPassword)
router.put('/address', verifyAccessToken, controller.updateUserAddress)

router.get('/getUsersToAdd',verifyAccessToken, controller.getUsersToAdd)
router.get('/getusers',verifyAccessToken, controller.getUsers)

router.delete('/deleteuser', verifyAccessToken, isAdmin, controller.deleteUser)
router.put('/updateuser',verifyAccessToken,uploader.single('avatar'), controller.updateUser)
router.put('/cart', verifyAccessToken, controller.updateUserCart)

router.put('/updateuserbyadmin/:uid', verifyAccessToken, isAdmin, controller.updateUserByAdmin)

module.exports = router


// create : POST
// read : GET
// update : PUT
//  delete : DELETE
// as