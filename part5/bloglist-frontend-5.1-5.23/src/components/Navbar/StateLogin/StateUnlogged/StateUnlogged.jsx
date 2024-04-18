import { useEffect, useState } from 'react';

import LoginForm from './LoginForm';
import FlotantWindow from '../../../utils/FlotantWindow';

const StateUnlogged = ({ setUser }) => {
    const [viewLogin, setViewLogin] = useState(false);

    useEffect(() => {
        setUser(!!localStorage.getItem('user'));
    }, [setUser, viewLogin]);

    return (
        <div>
            <button onClick={() => { setViewLogin(true); }} style={{ margin: '0px' }}>Login</button>
            { viewLogin ? <FlotantWindow setViewFn={ setViewLogin }><LoginForm setViewLogin={setViewLogin}/></FlotantWindow> : null }
        </div>
    );
};

export default StateUnlogged;