
const brand = require('../models/brand');
const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

// Tạo 
const createNewBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body);
    return res.json({
        success: response ? true : false,
        createNewBrand: response ? response : 'Cannot create',
    });
});


// // Get
const getBrand = asyncHandler(async(req, res) => {
    const response = await Brand.find()
    return res.status(200).json({
        success: response ? true : false,
        brands: response ? response : 'Cannot get brand'
    })
})

// Update 
const updateBrand = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const response = await Brand.findByIdAndUpdate(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updateBrand: response ? response : 'Cannot update'
    })
})

// delete
const deleteBrand = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const response = await Brand.findByIdAndDelete(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        deleteBrand: response ? response : 'Cannot Delete'
    })
})

module.exports = {
    createNewBrand,
    getBrand,
    updateBrand,
    deleteBrand
}