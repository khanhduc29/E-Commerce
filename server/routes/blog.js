const router = require('express').Router();
const controller = require('../controllers/blog')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', verifyAccessToken, isAdmin, controller.createNewBlog)
router.get('/', controller.getBlogs)
router.get('/one/:bid', controller.getBlog)

router.put('/uploadImageBlog/:bid', verifyAccessToken, isAdmin,uploader.single('image'), controller.uploadImageBlog)
router.delete('/:bid',verifyAccessToken, isAdmin, controller.deleteBlog)
router.put('/:bid', verifyAccessToken, isAdmin, controller.updateBlog)
router.put('/like/:bid',verifyAccessToken, controller.likeBlog)
router.put('/dislike/:bid',verifyAccessToken, controller.dislikeBlog)


module.exports = router