
const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

// Tạo 
const createCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body);
    return res.json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create',
    });
});


// // Get
const getCategories = asyncHandler(async(req, res) => {
    const response = await BlogCategory.find().select('title _id')
    return res.status(200).json({
        success: response ? true : false,
        productCategories: response ? response : 'Cannot get product categories'
    })
})

// Update product category
const updateCategory = asyncHandler(async(req, res) => {
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Cannot update'
    })
})

// delete product category
const deleteCategory = asyncHandler(async(req, res) => {
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndDelete(bcid, req.body, {new: true})
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