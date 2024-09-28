
const User = require('../models/user');

const asynncHandler = require('express-async-handler')


const registerUser = asynncHandler(async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    if(!email || !firstname || !lastname || !password){
        return res.status().json({
            success: false,
            mes: 'Missing inputs'
        })
      
    }
    const response = await User.create(req.body)
    return res.status().json({
        success: response ? true : false,
        response
    })
});

module.exports = {
    registerUser
}