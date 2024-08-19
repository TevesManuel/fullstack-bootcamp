import { useState } from 'react';
import { toast } from 'react-toastify';

import config from '../../../../utils/config';

import loginService from '../../../../services/login';

import ez from '../../../../utils/ez';

import { useUserDispatch } from '../../../../context/user';

const LoginForm = ({ setViewLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userDispatch = useUserDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        toast.promise(
            loginService.login(username, password).then((response) => {
                userDispatch({ type: 'LOGIN', payload: response.data });
                setUsername('');
                setPassword('');
                setViewLogin(false);
                return response.data.name;
            }),
            {
                pending: 'Logging in',
                success: {
                    render({ data }) {
                        return `Hello ${data}`;
                    },
                },
                error: 'User or password are invalid.',
            },
            config.NOTIFICATION_CONFIG,
        );
    };

    return (
        <form>
            <div>
                username
                <input
                    autoComplete='off'
                    type='text'
                    value={username}
                    name='Username'
                    onChange={ez.textInputFnGen(setUsername)}
                    style={{ width: '100%' }}
                />
            </div>
            <div>
                password
                <input
                    autoComplete='off'
                    type='password'
                    value={password}
                    name='Password'
                    onChange={ez.textInputFnGen(setPassword)}
                />
            </div>
            <div className='centerContent'>
                <button onClick={handleLogin}>login</button>
            </div>
        </form>
    );
};

import PropTypes from 'prop-types';

LoginForm.propTypes = {
    setViewLogin: PropTypes.func.isRequired,
};

export default LoginForm;
