const userRouter = require('./user');
const productRouter = require('./product');
const productCatagoryRouter = require('./productCategory')
const blogCatagoryRouter = require('./blogCategory')
const blogRouter = require('./blog')
const brandRouter = require('./brand')
const couponRouter = require('./coupon')
const insertData = require('./insert')
const orderRouter = require('./order');

const {notFound, errorHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productcategory', productCatagoryRouter);
    app.use('/api/blogcategory', blogCatagoryRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/coupon', couponRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/insert', insertData);


    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRoutes