const router = require('express').Router();
const controller = require('../controllers/blogCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, isAdmin, controller.createCategory)
router.get('/', controller.getCategories)
router.put('/:bcid', verifyAccessToken, isAdmin, controller.updateCategory)
router.delete('/:bcid', verifyAccessToken, isAdmin, controller.deleteCategory)

module.exports = router

// createCategory,
// getCategories,
// updateCategory,
// deleteCategory