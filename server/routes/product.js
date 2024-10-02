const router = require('express').Router();
const controller = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',verifyAccessToken, isAdmin, controller.createProduct )
router.get('/admin', controller.getProducts)
router.put('/:pid',verifyAccessToken, isAdmin, controller.updateProduct);
router.get('/:pid', controller.getProduct)
router.delete('/:pid',verifyAccessToken, isAdmin, controller.deleteProduct);


module.exports = router


// create : POST
// read : GET
// update : PUT
//  delete : DELETE
// as