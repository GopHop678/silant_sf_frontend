import {useEffect, useState} from "react";
import '../assets/css/authPage.css';
import {useNavigate} from "react-router-dom";
import {API_URL} from "../App.jsx";


export const handleLogout = async (setIsAuthenticated, setClientName, setClientRole) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
    }

    localStorage.removeItem('authToken');
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientRole');

    if (setIsAuthenticated) setIsAuthenticated(false);
    if (setClientName) setClientName('');
    if (setClientRole) setClientRole('');
};


const Logout = ({setIsAuthenticated, setClientName, setClientRole}) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        await fetch(
            `${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        localStorage.removeItem('authToken');
        localStorage.removeItem('clientName');
        localStorage.removeItem('clientRole');
        setIsAuthenticated(false);
        setClientName('');
        setClientRole('');
        navigate('/', {replace: true});
    }
    useEffect(() => {
        handleLogout();
    }, [])
}


const Login = ({setIsAuthenticated, setClientName, setClientRole, loginForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let response = await fetch(
                `${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                // credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Неверный логин или пароль');
            }
            let data = await response.json();
            localStorage.setItem('authToken', data.token);

            response = await fetch(
                `${API_URL}/client_name`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Token ${data.token}`,
                    },
                });
            data = await response.json();
            localStorage.setItem('clientName', data.clientName);
            localStorage.setItem('clientRole', data.clientRole);

            setIsAuthenticated(true);
            setClientName(data.clientName);
            setClientRole(data.clientRole);
            loginForm.current.classList = 'auth-page-hidden';
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={'auth-page-hidden'} ref={loginForm}
             onClick={(e) => {
                 if (e.target === loginForm.current) {
                     loginForm.current.classList = 'auth-page-hidden';
                 }
             }}>
            <div className="login-form-wrapper">
                <form className='login-form' onSubmit={handleLogin}>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <label>Логин:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={"submit-form-button"}

                        disabled={!(username && password)}
                    >Войти
                    </button>
                </form>
            </div>
        </div>
    );
};


export {Login, Logout}
