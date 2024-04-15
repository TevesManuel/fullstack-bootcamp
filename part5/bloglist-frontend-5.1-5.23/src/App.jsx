/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/Login';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './mvp.css';
import './style.css';

import config from './utils/config';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [toastMessage, setToastMessage] = useState({ });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        if(toastMessage)
        {
            switch (toastMessage.type)
            {
            case 'ok':
                toast.success(toastMessage.message,  {
                    position: 'bottom-right',
                    autoClose: config.TIME_MS_ERROR_DISPLAY,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
                break;
            case 'err':
                toast.error(toastMessage.message,  {
                    position: 'bottom-right',
                    autoClose: config.TIME_MS_ERROR_DISPLAY,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
                break;
            }
        }
        setToastMessage(null);
    }, [toastMessage]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    return (
        <div>
            <ToastContainer
                position='top-right'
                transition={Bounce}
            />
            <div id='titleContainer'>
                <h2 id='titleText'>BlogApp</h2>
                <div id='stateLogin'>
                    <p id='stateLoginText'>
                        {username ? username : 'Not logged'}
                    </p>
                </div>
            </div>
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
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