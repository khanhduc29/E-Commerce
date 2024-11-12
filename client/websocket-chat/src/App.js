// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect   } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import ListFriend from './components/ListFriend';


import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');
    const navigate = useNavigate();

    // Use useEffect to update the login state if localStorage changes
    useEffect(() => {
        const loginStatus = localStorage.getItem('isLogin');
        setIsLogin(loginStatus === 'true');
    }, []); // empty dependency array to run only on mount


// Hàm xử lý đăng xuất
const handleLogout = () => {
    axios.get('http://localhost:5000/api/user/logout', {}, { withCredentials: true })
        .then(() => {
            localStorage.removeItem('isLogin'); // Xóa trạng thái đăng nhập khỏi localStorage
            setIsLogin(false); // Cập nhật trạng thái đăng nhập
            navigate('/'); // Chuyển hướng về trang chủ hoặc trang đăng nhập
        })
        .catch((error) => {
            console.error("Lỗi khi đăng xuất:", error);
        });
};

    if (!isLogin) {
        return <Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} setIsLogin={setIsLogin}/>;
    }

    return (
        <>
         <button onClick={handleLogout}>Logout</button>
        <Routes>
            <Route path="/" element={<Chat />} />
            {/* <Route path="/" element={<ListFriend />} /> */}

        </Routes>
        
        </>
    );
};

export default App;
