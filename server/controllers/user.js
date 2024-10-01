
const User = require('../models/user');

const asynncHandler = require('express-async-handler')
const {genneratesAcessToken, genneratesRefreshToken} = require('../middlewares/jwt');
// const { response } = require('express');
const jwt = require('jsonwebtoken');
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto');


// dky
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
        const {password, role,refreshToken, ...userData} = response.toObject();
        // Tạo accessToken
        const accessToken = genneratesAcessToken(response._id, role)
        // Tạo refreshToken
        const newrefreshToken = genneratesRefreshToken(response._id)
        // Lưu refeshToken vào database
        await User.findByIdAndUpdate(response._id, {refreshToken: newrefreshToken }, {new:true})
        // Lưu refreshToken vào cookie
        res.cookie('refreshToken', newrefreshToken, {httpOnly:true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
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
        success: user ? true : false,
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
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
    return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? genneratesAcessToken(response._id, response.role) : 'Refresh token not matching'
    })
    
})

// Log out
const logout = asynncHandler(async(req, res) => {
  
    const cookie = req.cookies;
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie')
    // Tìm và xóa refresh token ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'logout in done'
    })

    
})

// Client gửi mail
// Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
// Báo phía client check mail => click vào link gửi trong mail đó
// Client sẽ gửi api kèm theo token
// Check token có giống token mà server gửi mail hây không
// Change password

const forgotPassword = asynncHandler(async(req, res)=> {
    const {email} = req.query;
    if(!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if(!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangeToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`
    const data = {
        email,
        html
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true ,
        rs
    })
})

// 
const resetPassword = asynncHandler(async(req, res) => {

    const {password, token} = req.body
    if(!password || !token) throw new Error('Missing input')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
    if(!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password': 'Something went wrong'
    })
})

// get users
const getUsers = asynncHandler(async(req, res) => {
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})


// deleteuser 
const deleteUser = asynncHandler(async(req, res) => {
    const {_id} = req.query
    if(!_id) throw new Error('Missing input')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'No user delete'
    })
})

// update user
const updateUser = asynncHandler(async(req, res) => {
    const {_id} = req.user
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

// update user by admin
const updateUserByAdmin = asynncHandler(async(req, res) => {
    const {uid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

module.exports = {
    registerUser,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin
}