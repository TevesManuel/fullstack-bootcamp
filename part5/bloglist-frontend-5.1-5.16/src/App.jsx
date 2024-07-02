import BlogList from './components/BlogList/BlogList';
import Navbar from './components/Navbar/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'mvp.css';
import './style.css';

import { useState } from 'react';

const App = () => {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('user'));

    return (
        <div>
            <ToastContainer/>
            <Navbar isLogged={isLogged} setIsLogged={setIsLogged}/>
            <BlogList/>
        </div>
    );
};

export default App;