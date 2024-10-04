const router = require('express').Router();
const controller = require('../controllers/brand')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, isAdmin, controller.createNewBrand)
router.get('/', controller.getBrand)
router.put('/:bid', verifyAccessToken, isAdmin, controller.updateBrand)
router.delete('/:bid', verifyAccessToken, isAdmin, controller.deleteBrand)

module.exports = router

// createCategory,
// getCategories,
// updateCategory,
// deleteCategory