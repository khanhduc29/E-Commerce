
const jwt = require('jsonwebtoken');

const genneratesAcessToken = (uId, role) => jwt.sign({_id: uId, role: role}, process.env.JWT_SECRET, {expiresIn: '3d'})

const genneratesRefreshToken = (uId, role) => jwt.sign({_id: uId, role: role}, process.env.JWT_SECRET, {expiresIn: '7d'})



module.exports = {
    genneratesAcessToken,
    genneratesRefreshToken
}