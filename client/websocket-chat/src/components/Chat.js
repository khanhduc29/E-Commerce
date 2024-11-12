import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ChatApp.css';

const ChatApp = () => {
    const [chats, setChats] = useState([]);  
    const [messages, setMessages] = useState([]);  
    const [newChatUserId, setNewChatUserId] = useState('');  
    const [selectedChatId, setSelectedChatId] = useState(null);  
    const [newMessage, setNewMessage] = useState('');  
    const [userId, setUserId] = useState(null);  
    const [users, setUsers] = useState([]);  

    // Get current user ID and chats when component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/user/getCurrent', {
            withCredentials: true,
        })
            .then(res => {
                if (res.data.success) {
                    setUserId(res.data.re._id);
                    findUsersChat(res.data.re._id);
                    loadUsers();
                }
            })
            .catch(err => console.error("Error fetching user data:", err));
    }, []);

    // Create a new chat or load an existing one
    const createChat = (friendId) => {
        // Check if a chat already exists with this friend
        const existingChat = chats.find(chat =>
            (chat.firstId === userId && chat.secondId === friendId) ||
            (chat.firstId === friendId && chat.secondId === userId)
        );

        if (existingChat) {
            // If chat exists, load messages
            loadMessages(existingChat._id);
        } else {
            // Otherwise, create a new chat
            axios.post('http://localhost:5000/api/chat', {
                firstId: userId,
                secondId: friendId
            }, {
                withCredentials: true,
            })
                .then(res => {
                    setChats([...chats, res.data]);
                    loadMessages(res.data._id);  // Load messages for the new chat
                })
                .catch(err => console.error("Error creating chat:", err));
        }
    };

    // Find user chats
    const findUsersChat = (userId) => {
        axios.get(`http://localhost:5000/api/chat/${userId}`, {
            withCredentials: true,
        })
            .then(res => {
                setChats(res.data.chats);
                if (res.data.chats.length > 0) {
                    setSelectedChatId(res.data.chats[0]._id);  // Select the first chat
                }
            })
            .catch(err => {
                console.error("Error fetching chats:", err);
            });
    };

    // Load messages for a specific chat
    const loadMessages = (chatId) => {
        setSelectedChatId(chatId);
        axios.get(`http://localhost:5000/api/message/${chatId}`, {
            withCredentials: true,
        })
            .then(res => {
                setMessages(res.data.response);
            })
            .catch(err => console.error("Error fetching messages:", err));
    };

    // Load users to start a chat with
    const loadUsers = () => {
        axios.get('http://localhost:5000/api/user/getUsersToAdd', {
            withCredentials: true,
        })
            .then(res => {
                setUsers(res.data.users);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
            });
    };

    // Send a message in the selected chat
    const sendMessage = () => {
        if (newMessage.trim() === '') return;
        axios.post('http://localhost:5000/api/message', {
            chatId: selectedChatId,
            senderId: userId,
            text: newMessage
        }, {
            withCredentials: true,
        })
            .then(res => {
                setMessages([...messages, res.data.createMessage]);
                setNewMessage('');
            })
            .catch(err => console.error("Error sending message:", err));
    };

    return (
        <div className="chat-app-container">
            <div className="sidebar">
                <h3>Danh sách bạn bè</h3>
                <div className="user-list">
                    {users.map(user => (
                     
                        <div key={user._id} className="user-item" >
                            <img 
                                src={user.avatar || 'default-avatar.jpg'}
                                alt={'img'}
                                className="avatar"
                                
                            />
                            <span>{user.firstname} {user.lastname}</span>
                            <button onClick={() => createChat(user._id)}>Nhắn tin</button>
                        </div>
                    ))}
                </div>

                <div className="chat-list">
                    {chats.map(chat => (
                        <div key={chat._id} onClick={() => loadMessages(chat._id)} className="chat-item">
                            <p>Cuộc trò chuyện {chat._id}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedChatId && (
                <div className="chat-window">
                    <div className="messages-container">
                        {messages.map(message => (
                            <div key={message._id} className="message">
                                <p><strong>{message.senderId}</strong>: {message.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Nhập tin nhắn"
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        cursor: 'pointer',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    },
};
export default ChatApp;
