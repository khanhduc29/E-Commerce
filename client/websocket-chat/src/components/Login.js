import React, { useState } from 'react';
import '../App.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const Login = ({ email, password, setEmail, setPassword,  setIsLogin }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);

                // Save user data in localStorage
                localStorage.setItem('isLogin', 'true');  // set 'true' explicitly
                localStorage.setItem('user', JSON.stringify(data.userData));
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));


                setIsLogin(true);
                // Navigate to Chat page
                navigate('/', { replace: true });  // replace true to avoid back navigation to login
            } else {
                setError(data.mes || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Login;
