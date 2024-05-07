import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
            });
            // Optionally, you can automatically log in the user after registration
            navigate('/login')

        } catch (error) {
            console.error('Registration failed:', error.response.data.error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;