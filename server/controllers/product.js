
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
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // Filter special fildes on query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);

    //Format operators for valid syntax mongoose query
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (matchedEl) => `$${matchedEl}`,
    );
    const formatedQueries = JSON.parse(queryString);

    //filter
    if (queries?.title)
        formatedQueries.title = { $regex: queries.title, $options: 'i' };
    let queryCommand = Product.find(formatedQueries);

    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //Pagination
    //limit: số object
    //skip

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    queryCommand
        .then(async (response) => {
            const counts = await Product.find(formatedQueries).countDocuments();
            return res.status(200).json({
                success: response ? true : false,
                counts,
                products: response ? response : 'Cannot get products',
            });
        })
        .catch((error) => {
            throw new Error(error.message);
        });
});
// sort: -price, -brand
// tile: Máy
// price[gt] = 2000 lớn hơn hoặc bằng
// price[lt] = 2000 nhỏ hơn hoặc bằng
// fields: -description // loại trừ nếu không muốn hiển thị
// bỏ trừ thì lấy mỗi trường đó


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


const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) {
        throw new Error('Missing inputs');
    }
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find(
        (el) => el.postedBy.toString() === _id,
    );
    if (alreadyRating) {
        //update star and cooment
        await Product.updateOne(
            {
                ratings: { $elemMatch: alreadyRating },
            },
            {
                $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
            },
            { new: true },
        );
    } else {
        //add satr and comment
        await Product.findByIdAndUpdate(
            pid,
            {
                $push: { ratings: { star, comment, postedBy: _id } },
            },
            { new: true },
        );
    }

    //sum rating
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRating = updatedProduct.ratings.reduce(
        (sum, el) => sum + +el.star,
        0,
    );
    updatedProduct.totalRatings =
        Math.round((sumRating * 10) / ratingCount) / 10;
    await updatedProduct.save();
    return res.status(200).json({
        status: true,
        updatedProduct,
    });
});



module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings
}