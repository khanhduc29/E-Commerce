const router = require('express').Router();
const controller = require('../controllers/message')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, controller.createMessage)
router.get('/:chatId',verifyAccessToken, controller.getMessage)



module.exports = router

