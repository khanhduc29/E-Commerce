const router = require('express').Router();
const controller = require('../controllers/user')
router.post('/registerUser', controller.registerUser )

module.exports = router


// create : POST
// read : GET
// update : PUT
//  delete : DELETE