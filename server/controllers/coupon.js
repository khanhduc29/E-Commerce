

const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

// Tạo 
const createNewCoupon = asyncHandler(async (req, res) => {
    const {name, discount, expiry} = req.body
    if(!name || !discount || !expiry) throw new Error('Missing inputs')
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.json({
        success: response ? true : false,
        createNewBrand: response ? response : 'Cannot create',
    });
});


// // Get
const getCoupon = asyncHandler(async(req, res) => {
    const response = await Coupon.find().select("-createAt -updateAt")
    return res.status(200).json({
        success: response ? true : false,
        coupons: response ? response : 'Cannot get Coupon'
    })
})

// Update 
const updateCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 *60 *1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updateCoupon: response ? response : 'Cannot update'
    })
})

// delete
const deleteCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        deleteCoupon: response ? response : 'Cannot Delete'
    })
})

module.exports = {
    createNewCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}