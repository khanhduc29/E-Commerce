
const jwt = require('jsonwebtoken');

const genneratesAcessToken = (uId, role) => jwt.sign({_id: uId, role: role}, process.env.JWT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_MAX_AGE})

const genneratesRefreshToken = (uId, role) => jwt.sign({_id: uId, role: role}, process.env.JWT_SECRET, {expiresIn: process.env.REFRESH_TOKEN_MAX_AGE})



module.exports = {
    genneratesAcessToken,
    genneratesRefreshToken
}