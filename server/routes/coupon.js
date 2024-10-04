const router = require('express').Router();
const controller = require('../controllers/coupon')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, isAdmin, controller.createNewCoupon)
router.get('/', controller.getCoupon)
router.put('/:cid', verifyAccessToken, isAdmin, controller.updateCoupon)
router.delete('/:cid', verifyAccessToken, isAdmin, controller.deleteCoupon)

module.exports = router

// createCategory,
// getCategories,
// updateCategory,
// deleteCategory