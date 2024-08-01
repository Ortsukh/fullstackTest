import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import EditAccount from './pages/EditAccount';
import People from './pages/People';
import GlobalStyle from './styles/GlobalStyle';
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Login from "./pages/Login";
import ErrorModal from "./components/modals/ErrorModal";
import {AppContext} from "./AppContext";

const App: React.FC = () => {
    const {errorMessage, errorContext, setErrorMessage, setErrorContext} = useContext(AppContext);
    const closeErrorModal = () => {
        setErrorMessage('');
        setErrorContext('');
    };
    return (
        <Router>
            <GlobalStyle/>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={<PrivateRoute element={<Profile/>}/>}/>
                <Route path="/edit" element={<PrivateRoute element={<EditAccount/>}/>}/>
                <Route path="/people" element={<PrivateRoute element={<People/>}/>}/>
            </Routes>
            {errorContext && <ErrorModal error={errorMessage} onClose={closeErrorModal}/>}
        </Router>
    );
};

export default App;