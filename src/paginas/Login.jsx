import React, { useState } from 'react';
import logoImage from '../img/queso.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Lógica de inicio de sesión aquí.
        if (email === 'usuario@example.com' && password === 'contrasena') {
            setLoggedIn(true);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-warning">
            <div className="login-card bg-white rounded shadow p-4 text-center" style={{ maxWidth: '400px' }}>
                <div className="logo">
                    <img src={logoImage} alt="Logo del proyecto" className="w-100 h-100 mb-3" />
                </div>
                <h1 className="mb-3">¡BIENVENIDO!</h1>
                <form>
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
                    {loggedIn ? (
                        <p className="text-success mb-4">¡Inicio de sesión exitoso!</p>
                    ) : (
                        <button onClick={handleLogin} className="btn btn-primary btn-block">
                            Iniciar sesión
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;