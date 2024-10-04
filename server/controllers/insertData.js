const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const data = require('../../data/ecommerce.json');
const categoryData = require('../../data/create_brand');
const slugify = require('slugify');
const productCategory = require('../models/productCategory');

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 1000) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find((el) => el.label === 'Color')?.variants[0],
    });
};

const insertProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let product of data) promises.push(fn(product));
    await Promise.all(promises);
    return res.json('Done');
});
const fn2 = async (cate) => {
    await productCategory.create({
        title: cate?.cate,
        brand: cate?.brand,
    });
};
const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    console.log(categoryData)
    for (let cate of categoryData) promises.push(fn2(cate));
    await Promise.all(promises);
    return res.json('Done');
});

module.exports = {
    insertProduct,
    insertCategory,
};