const router = require('express').Router();
const controller = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/',verifyAccessToken, isAdmin, controller.createProduct )
router.get('/admin', controller.getProducts)
router.put('/ratings',verifyAccessToken, controller.ratings)
router.post('/uploadImageProduct/:pid',verifyAccessToken, isAdmin,uploader.array('images', 10), controller.uploadImageProductNewUrl)
router.put('/uploadImageProduct/:pid',verifyAccessToken, isAdmin,uploader.array('images', 10), controller.uploadImageProduct)

router.put('/:pid',verifyAccessToken, isAdmin, controller.updateProduct);
router.get('/:pid', controller.getProduct)
router.delete('/:pid',verifyAccessToken, isAdmin, controller.deleteProduct);


module.exports = router


// create : POST
// read : GET
// update : PUT
//  delete : DELETE
// as