import { useState } from 'react';

import LoginForm from './LoginForm';
import FlotantWindow from '../../../utils/FlotantWindow';

const StateUnlogged = () => {
    const [viewLogin, setViewLogin] = useState(false);

    return (
        <div>
            <button
                onClick={() => {
                    setViewLogin(true);
                }}
                style={{ margin: '0px' }}
            >
                Login
            </button>
            {viewLogin ?
                <FlotantWindow setViewFn={setViewLogin}>
                    <LoginForm setViewLogin={setViewLogin} />
                </FlotantWindow>
            :   null}
        </div>
    );
};

export default StateUnlogged;
