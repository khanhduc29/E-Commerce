const router = require('express').Router();
const controller = require('../controllers/insertData');

router.post('/', controller.insertProduct);
router.post('/cate', controller.insertCategory);

module.exports = router




