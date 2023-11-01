import React, { useState } from 'react';
import './Login.css'; // Asegúrate de que la ruta sea correcta.
import logoImage from '../img/queso.png';

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
        <div className="login-container">
            <div className='login-card'>
                <div className="logo">
                    <img src={logoImage} alt="Logo del proyecto" />
                </div>
                <h1>¡BIENVENIDO!</h1>
                <form>
                    <input
                        type="email"
                        placeholder="Usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loggedIn ? (
                        <p>¡Inicio de sesión exitoso!</p>
                    ) : (
                        <button onClick={handleLogin}>Iniciar sesión</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;
