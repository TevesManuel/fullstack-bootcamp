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
import manageToasts from './utils/toastManager';

import UserInfo from './components/UserInfo';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [toastMessage, setToastMessage] = useState({ });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            <div id='titleContainer'>
                <h2 id='titleText'>BlogApp</h2>
                <div id='stateLogin'>
                    <button id="stateLoginTouchable" onClick={() => {if(window.localStorage.getItem('user')){setViewUserInfo(true);}}}>
                        <p>
                            {
                                window.localStorage.getItem('user') ?
                                    JSON.parse(window.localStorage.getItem('user')).name :
                                    'Not logged'
                            }
                        </p>
                    </button>
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