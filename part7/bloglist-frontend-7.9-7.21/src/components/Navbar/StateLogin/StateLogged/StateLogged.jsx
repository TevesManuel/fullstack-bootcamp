import { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import FlotantWindow from '../../../utils/FlotantWindow';

const StateLogged = ({ setIsLogged }) => {
    const [viewUserInfo, setViewUserInfo] = useState(false);

    useEffect(() => {
        setIsLogged(!!localStorage.getItem('user'));
    }, [setIsLogged, viewUserInfo]);

    if (window.localStorage.getItem('user')) {
        return (
            <div id='loggedStateDiv'>
                {window.localStorage.getItem('user') && viewUserInfo ?
                    <FlotantWindow setViewFn={setViewUserInfo}>
                        <UserInfo
                            setIsLogged={setIsLogged}
                            setViewUserInfo={setViewUserInfo}
                        />
                    </FlotantWindow>
                :   null}

                <button
                    id='stateLoginTouchable'
                    onClick={() => {
                        if (window.localStorage.getItem('user')) {
                            setViewUserInfo(true);
                        }
                    }}
                >
                    <p>
                        {JSON.parse(window.localStorage.getItem('user')).name}
                    </p>
                </button>
            </div>
        );
    } else return 'error';
};

import PropTypes from 'prop-types';

StateLogged.propTypes = {
    setIsLogged: PropTypes.func.isRequired,
};

export default StateLogged;
