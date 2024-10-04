const router = require('express').Router();
const ctrls = require('../controllers/order');
// const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createNewOrder);
router.put('/status/:oid', [verifyAccessToken, isAdmin], ctrls.updateStatus);
router.get('/admin', [verifyAccessToken, isAdmin], ctrls.getOrders);
router.get('/', [verifyAccessToken], ctrls.getUserOrder);

module.exports = router;