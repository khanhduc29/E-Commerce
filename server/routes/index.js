const userRouter = require('./user');
const productRouter = require('./product');

const {notFound, errorHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    
    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRoutes