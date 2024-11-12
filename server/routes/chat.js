const router = require('express').Router();
const controller = require('../controllers/chat')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, controller.createChat)
router.get('/:userId',verifyAccessToken, controller.findUsersChats)
router.get('/find/:firstId/:secondId', verifyAccessToken, controller.findChat)


module.exports = router

