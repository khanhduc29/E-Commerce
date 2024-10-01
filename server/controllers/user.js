
const User = require('../models/user');

const asynncHandler = require('express-async-handler')
const {genneratesAcessToken, genneratesRefreshToken} = require('../middlewares/jwt');
// const { response } = require('express');
const jwt = require('jsonwebtoken');

const registerUser = asynncHandler(async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    if(!email || !firstname || !lastname || !password){
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
      
    }

    const user = await User.findOne({ email: email });
    if(user){
        throw new Error(`User <${user.email}> already exists`);

    }else{
        const newUser = await User.create(req.body);
        return res.status(200).json({
            sucess: newUser ? true : false,
            mes: newUser ? 'Register is successfully. Please to login!' : 'Something went wrong'

        })
    }
    
});

// Refresh token -> Cấp mới access token
// Access token -> Xác thực người dùng, phân quyền người dùng

const login = asynncHandler(async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
      
    }
    // plain object

    const response = await User.findOne({ email });
    // console.log(await response.isCrorrectPassword(password))
    if(response && await response.isCrorrectPassword(password)){
        // tách password và role ra khỏi response
        const {password, role, ...userData} = response.toObject();
        // Tạo accessToken
        const accessToken = genneratesAcessToken(response._id, role)
        // Tạo refreshToken
        const refreshToken = genneratesRefreshToken(response._id)
        // Lưu refeshToken vào database
        await User.findByIdAndUpdate(response._id, {refreshToken }, {new:true})
        // Lưu refreshToken vào cookie
        res.cookie('refreshToken', refreshToken, {httpOnly:true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData: userData
        })
    }else{
        throw new Error('Invalid credentials!')
    }
    
});

// Get a user
const getCurrent = asynncHandler(async (req, res) => {
    const {_id} = req.user;
  
    // Không muốn lấy trường nào thì - cái đó
    const user = await User.findById(_id).select('-refreshToken -password -role');
    
    return res.status(200).json({
        success: user,
        re: user ? user : 'User not found'
    })
    
});

// refresh token
const refreshAccessToken = asynncHandler(async(req, res) => {
    // Lấy token từ cookie
    const cookie = req.cookies
    // Check xem có tooken hay không
    if(!cookie  && !cookie.refreshToken) throw new Error('No refresh token in cookie')
    // Check token có hợp lệ hay không
    jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        if(err) throw new Error('Invalid refresh token') 
        // Check xme token có khớp với token đã lưu trong db k
        const response = await User.findOne({_id: decode._id, refreshToken: cookie.refreshToken});
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? genneratesAcessToken({_id: response._id, role: response.role}) : 'Refresh token mot mached'

        })
    })  
})

module.exports = {
    registerUser,
    login,
    getCurrent,
    refreshAccessToken
}