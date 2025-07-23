import { useState, useRef, useEffect } from 'react';
import './assets/css/App.css';
import {Login} from "./components/login.jsx";
import {Footer, Header} from "./components/headerFooter.jsx";
import {Card} from "./components/objectCards.jsx";
import {MainPage} from "./components/mainPage.jsx";
import {NewObjectCard} from "./components/newObjectCards.jsx";


export const API_URL = 'http://127.0.0.1:8000/api'


function App() {
    const [currentPage, setCurrentPage] = useState('main');
    const [isAuthenticated, setIsAuthenticated] = useState(
      () => !!localStorage.getItem('authToken'));
    const [clientName, setClientName] = useState(
      () => localStorage.getItem('clientName'));
    const [clientRole, setClientRole] = useState(
      () => localStorage.getItem('clientRole'));
    const loginForm = useRef(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const page = queryParams.get('page');
        if (page === 'card') {
            setCurrentPage('card');
        } else if (page === 'new') {
            setCurrentPage('new');
        }
    }, []);

    return (
        <div className={'content-wrapper'}>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setClientName={setClientName}
                setClientRole={setClientRole}
                loginForm={loginForm}
            />
            {currentPage === 'main' && <MainPage
                clientName={clientName}
                clientRole={clientRole}
            />}
            {isAuthenticated && currentPage === 'card' && <Card
                clientRole={clientRole}
                setCurrentPage={setCurrentPage}
            />}
            {isAuthenticated && currentPage === 'new' && <NewObjectCard
                setCurrentPage={setCurrentPage}
            />}
            {!isAuthenticated && (
                <Login
                    setIsAuthenticated={setIsAuthenticated}
                    setClientName={setClientName}
                    setClientRole={setClientRole}
                    loginForm={loginForm}
                />
            )}

            <Footer />
        </div>
    )
}

export default App
