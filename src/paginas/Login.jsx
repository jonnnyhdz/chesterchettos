import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../img/queso.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessDenied, setAccessDenied] = useState(false);
    const navigate = useNavigate();

    const allowedUsers = [
        { email: 'jonny@quesos.com', password: '123' },
        { email: 'miau@quesos.com', password: '123' },
        { email: 'adan@quesos.com', password: '123' },
        { email: 'gopar@quesos.com', password: '123' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        const isValidUser = allowedUsers.some(user => user.email === email && user.password === password);

        if (isValidUser) {
            navigate('/dashboard');
        } else {
            setAccessDenied(true);

            setTimeout(() => {
                setAccessDenied(false);
            }, 2000);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-warning">
            <div className="login-card bg-white rounded shadow p-4 text-center" style={{ maxWidth: '400px' }}>
                <div className="logo">
                    <img src={logoImage} alt="Logo del proyecto" className="w-100 h-100 mb-3" />
                </div>
                <h1 className="mb-3">¡BIENVENIDO!</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control mb-3"
                    />
                    {accessDenied && (
                        <p className="text-danger mb-4">Acceso denegado. Credenciales incorrectas.</p>
                    )}
                    <button type="submit" className="btn btn-primary btn-block">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
