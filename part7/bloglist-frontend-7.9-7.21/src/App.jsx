import BlogList from './components/BlogList/BlogList';
import Navbar from './components/Navbar/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'mvp.css';
import './style.css';

import { UserContextProvider } from './context/user';

import UserList from './components/UserList/UserList';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <ToastContainer />
            <UserContextProvider>
                <Navbar />
                <Routes>
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/" element={<BlogList />} />
                </Routes>
            </UserContextProvider>
        </Router>
    );
};

export default App;
