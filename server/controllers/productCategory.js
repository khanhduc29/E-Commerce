
const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

// Tạo 
const createCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body);
    return res.json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create',
    });
});


// // Get
const getCategories = asyncHandler(async(req, res) => {
    const response = await ProductCategory.find().select('title _id')
    return res.status(200).json({
        success: response ? true : false,
        productCategories: response ? response : 'Cannot get product categories'
    })
})

// Update product category
const updateCategory = asyncHandler(async(req, res) => {
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Cannot update'
    })
})

// delete product category
const deleteCategory = asyncHandler(async(req, res) => {
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Cannot Delete'
    })
})

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}