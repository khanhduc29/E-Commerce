const userRouter = require('./user');
const productRouter = require('./product');
const productCatagoryRouter = require('./productCategory')
const blogCatagoryRouter = require('./blogCategory')


const {notFound, errorHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productcategory', productCatagoryRouter);
    app.use('/api/blogcategory', blogCatagoryRouter);


    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRoutes