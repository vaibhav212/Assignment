// components/Login.js
import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login_get', {
                username,
                password
            });
            // Store access token in SessionStorage
            sessionStorage.setItem('accessToken', response.data.token.access);
            sessionStorage.setItem('role', response.data.role);
            // Redirect to DataList component upon successful login
            navigate('/DataList');
        } catch (error) {
            setError('Invalid username or password.');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

   return (
            <div className={'mainContainer'}>
            <div className={'titleContainer'}>
            <div>Login</div>
            </div>
            <br />
                <div className={'inputContainer'}>
                    <input value={username} placeholder="Enter your email here"
                        onChange={(ev) => setUsername(ev.target.value)}
                        className={'inputBox'} />
                </div>
            <br />
                <div className={'inputContainer'}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        autoComplete="current-password"
                        className={'inputBox'} />
                        <span className="eyeIcon" onClick={handleTogglePassword}>
                            <Icon icon={showPassword ? eye : eyeOff} size={25} />
                        </span>
                    </div>
            <br />
            {error && <div className={'error'}>{error}</div>}
            <br />
            <div className={'inputContainer'}>
                <input className={'button'} type="button" onClick={handleSubmit} value={'Login'} />
            </div>
            </div>
    )
}
export default Login;

