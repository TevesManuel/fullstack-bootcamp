import { useEffect, useState } from 'react';

import LoginForm from './LoginForm';
import FlotantWindow from '../../../utils/FlotantWindow';

const StateUnlogged = ({ setIsLogged }) => {
    const [viewLogin, setViewLogin] = useState(false);

    useEffect(() => {
        setIsLogged(!!localStorage.getItem('user'));
    }, [setIsLogged, viewLogin]);

    return (
        <div>
            <button onClick={() => { setViewLogin(true); }} style={{ margin: '0px' }}>Login</button>
            { viewLogin ? <FlotantWindow setViewFn={ setViewLogin }><LoginForm setViewLogin={setViewLogin}/></FlotantWindow> : null }
        </div>
    );
};

import PropTypes from 'prop-types';

StateUnlogged.propTypes = {
    setIsLogged: PropTypes.func.isRequired
};

export default StateUnlogged;