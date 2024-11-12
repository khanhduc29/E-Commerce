import React, { useEffect, useState } from 'react';

const FriendList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    
    useEffect(() => {
        // Lấy danh sách người dùng từ API
        const token = localStorage.getItem('accessToken');
        console.log(token);

        // Kiểm tra nếu có token
        fetch('http://localhost:5000/api/user/getUsersToAdd', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,  // Gửi token trong header (nếu cần)
            },
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data.users);  // Cập nhật danh sách người dùng
            console.log(data.users); // Hiển thị danh sách người dùng trong console
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, []);

    return (
        <div>
            <h2>Danh sách bạn bè</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user._id} style={styles.listItem} onClick={() => setSelectedUser(user)}>
                        <img 
                            src={user.avatar || 'default-avatar.jpg'} // Nếu không có ảnh, dùng ảnh mặc định
                            alt={`${user.firstname} ${user.lastname}`} 
                            style={styles.avatar}
                        />
                        <span>{user.firstname} {user.lastname}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Style cho các phần tử
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

export default FriendList;
