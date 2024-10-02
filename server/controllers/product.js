
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

// Tạo mới sản phẩm
const createProduct = asyncHandler(async(req, res ) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create new product'
    })
    
})

// get product
const getProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})

// get all product //filltering: lấy sản phẩm theo điều kiện 
//sorting Lấy sản phẩm theo sắp xếp 
//pagination lấy sản phẩm theo phân trang
const getProducts = asyncHandler(async(req, res) => {
 
    const product = await Product.find()
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})

// Update product
const updateProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : 'Cannot update product'
    })
})

// delete product
const deleteProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: true,
        deleteProduct: deleteProduct ? deleteProduct : 'Cannot delelte product'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}