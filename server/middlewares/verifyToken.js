const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { refreshAccessToken } = require('../controllers/user');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    console.log("VERIFY_ACCESS_TOKEN");
    
    // Bearer token
    // headers: { authorization: Bearer token}
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                if (err.message === "jwt must be provided" || err === jwt.TokenExpiredError) {
                    console.log("Bearer token expired, refreshing new access token");
                    return refreshAccessToken(req, res, next)
                    
                } else {
                    console.log("Invalid bearer token, continuing with cookie token");
                    return verifyAccessTokenWithCookie(req, res, next)
                }
            }
            // console.log(decode)
            req.user = decode
            next()
        })
    } else {
        verifyAccessTokenWithCookie(req, res, next)
    }

});

const verifyAccessTokenWithCookie = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies

    if (!cookie && !cookie.accessToken) throw new Error('No access token in cookie')

    jwt.verify(cookie.accessToken, process.env.JWT_SECRET, (error, dec) => {
        if (error) {
            if (error.message === "jwt must be provided" || err === jwt.TokenExpiredError) {
                console.log("Cookies token expired, refreshing new access token");
                return refreshAccessToken(req, res, next)
            } else {
                return res.status(403).json({
                    success: false,
                    mes: 'Invalid cookie token'
                })
            }
        }
        req.user = dec
        next()
    })
})

// phân quyền user
const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req.user
    if (role !== 'admin')
        return res.status(401).json({
            success: false,
            mes: ' REQUIRE ADMIN ROLE'
        })
    next()
})

module.exports = {
    verifyAccessToken,
    verifyAccessTokenWithCookie,
    isAdmin,
}