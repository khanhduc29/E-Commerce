const express = require('express');
// import express 
require('dotenv').config()
const dbConnect = require('./config/dbconnect.js');
const initRouter = require('./routes/index.js');
const cookieParser =  require('cookie-parser');
const http = require('http');
// const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8888


// Cấu hình CORS cho phép yêu cầu từ frontend (ReactJS)
app.use(cors({
    origin: 'http://localhost:3000',  // Cấu hình nguồn cho phép (frontend React chạy trên port 3000)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],        // Các phương thức HTTP cho phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
    credentials: true                 // Cho phép cookie và các chứng thực khác
}));

// Để đọc hiểu data client gửi lên
app.use(express.json());
app.use(cookieParser());
// Đọc được data gửi kiểu array object
app.use(express.urlencoded({extended: true}));
dbConnect()
initRouter(app)


// // Tạo HTTP server và WebSocket server
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// Sử dụng WebSocket cho các chức năng chat và kết bạn
// wss.on('connection', (ws, req) => {
//     console.log('WebSocket client connected');

//     // Lắng nghe tin nhắn từ client
//     ws.on('message', (message) => {
//         try {
//             const parsedMessage = JSON.parse(message);

//             // Xử lý các loại tin nhắn thông qua các hàm trong websocketHandlers
//             switch (parsedMessage.type) {
//                 case 'friend_request':
//                     websocketHandlers.sendFriendRequest(ws, parsedMessage);
//                     break;
//                 case 'chat_message':
//                     websocketHandlers.sendMessage(ws, parsedMessage);
//                     break;
//                 case 'edit_message':
//                     websocketHandlers.editMessage(ws, parsedMessage);
//                     break;
//                 case 'delete_message':
//                     websocketHandlers.deleteMessage(ws, parsedMessage);
//                     break;
//                 default:
//                     console.log('Unknown message type:', parsedMessage.type);
//             }
//         } catch (error) {
//             console.error('Error parsing message:', error);
//         }
//     });

//     // Xử lý ngắt kết nối
//     ws.on('close', () => {
//         console.log('WebSocket client disconnected');
//         websocketHandlers.handleDisconnect(ws);
//     });
// });

app.listen(port, () => {
    console.log('server listening on the port: '+ port);
});