import { useState } from 'react';

import loginService from './../services/login';
import ez from './../utils/ez';

const LoginForm = ({ setToastMessage }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        loginService.login(username, password)
            .then(response => {
                setToastMessage({
                    message: `Welcome again ${username}`,
                    type: 'ok',
                });
                window.localStorage.setItem('user', JSON.stringify(response.data));
                setUsername('');
                setPassword('');
            })
            .catch(() => {
                setToastMessage({ message: 'User or password are invalid.', type: 'err' });
            });
    };

    return (
        <div className="centerContent">
            <form onSubmit={handleLogin}>
                <div>
            username
                    <input
                        autoComplete="off"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={ez.textInputFnGen(setUsername)}
                    />
                </div>
                <div>
            password
                    <input
                        autoComplete="off"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={ez.textInputFnGen(setPassword)}
                    />
                </div>
                <div className="centerContent">
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;