/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import config from './utils/config';

import Blog from './components/Blog';
import LoginForm from './components/Login';
import UserInfo from './components/UserInfo';
import Navbar from './components/Navbar';

import blogService from './services/blogs';
import manageToasts from './utils/toastManager';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './mvp.css';
import './style.css';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [toastMessage, setToastMessage] = useState({ });

    const [viewUserInfo, setViewUserInfo] = useState(false);

    useEffect(() => {
        manageToasts(toastMessage);
        setToastMessage(null);
    }, [toastMessage]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    return (
        <div>
            { window.localStorage.getItem('user') && viewUserInfo ? <UserInfo setToastMessage={setToastMessage} setViewUserInfo={ setViewUserInfo }/> : null}

            <ToastContainer
                position='top-right'
                transition={Bounce}
            />
            <Navbar/>
            <LoginForm
                setToastMessage={setToastMessage}
            />
            <section>
                <header>
                    <h2>Blogs</h2>
                </header>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </section>
        </div>
    );
};

export default App;