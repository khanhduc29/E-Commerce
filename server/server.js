const express = require('express');
// import express 
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8888

// Để đọc hiểu data client gửi lên
app.use(express.json());
// Đọc được data gửi kiểu array object
app.use(express.urlencoded({extended: true}));

app.use('/', (req, res) => {
    res.send('Server online')
})

app.listen(port, () => {
    console.log('server listening on the port: '+ port);
});