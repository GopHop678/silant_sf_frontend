import '../assets/css/header.css';
import {handleLogout} from "./login.jsx";


const Header = ({ isAuthenticated, setIsAuthenticated,
                    setClientName, setClientRole, loginForm }) => {
    const showLoginForm = () => {
        loginForm.current.className = 'auth-page-active'
    }

    return (
        <header className="header">
            <div className="header-flex-container">
                <div className="header_logo">
                    <img alt={"Силант"} src={"src/assets/img/logotype.jpg"}/>
                </div>
                <div className='header_contacts'>
                    <span>+7-8352-20-12-09</span>
                    <span><a href='https://t.me/chzsa21' target='_blank'>Telegram</a></span>
                </div>
                {isAuthenticated ? (
                    <div className="header_button logout" onClick={
                        () => handleLogout(
                            setIsAuthenticated, setClientName, setClientRole
                        )}>Выйти</div>
                ) : (
                    <button className="header_button login"
                            onClick={showLoginForm}
                    >Вход</button>
                )}
            </div>
            <div className='header-text'>
                <span>Электронная сервисная книжка "Мой Силант"</span>
            </div>
        </header>
    )
}


const Footer = () => {
    return (
        <div className="footer">
            <div>
                <span>+7-8352-20-12-09</span>
                <span><a href='https://t.me/chzsa21' target='_blank'>
                    Telegram
                </a></span>
            </div>
            <span className={'copyright'}>Мой Силант 2022</span>
        </div>
    )
}

export {Header, Footer}