const router = require('express').Router();
const controller = require('../controllers/productCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, isAdmin, controller.createCategory)
router.get('/', controller.getCategories)
router.put('/:pcid', verifyAccessToken, isAdmin, controller.updateCategory)
router.delete('/:pcid', verifyAccessToken, isAdmin, controller.deleteCategory)

module.exports = router

// createCategory,
// getCategories,
// updateCategory,
// deleteCategory