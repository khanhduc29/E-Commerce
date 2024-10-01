const express = require('express');
// import express 
require('dotenv').config()
const dbConnect = require('./config/dbconnect.js');
const initRouter = require('./routes/index.js');
const cookieParser =  require('cookie-parser');

const app = express();
const port = process.env.PORT || 8888

// Để đọc hiểu data client gửi lên
app.use(express.json());
app.use(cookieParser());
// Đọc được data gửi kiểu array object
app.use(express.urlencoded({extended: true}));
dbConnect()
initRouter(app)


app.listen(port, () => {
    console.log('server listening on the port: '+ port);
});