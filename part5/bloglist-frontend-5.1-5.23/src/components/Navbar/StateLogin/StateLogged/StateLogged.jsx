import { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import FlotantWindow from '../../../utils/FlotantWindow';

const StateLogged = ({ setUser }) => {
    const [viewUserInfo, setViewUserInfo] = useState(false);

    useEffect(() => {
        setUser(!!localStorage.getItem('user'));
    }, [setUser, viewUserInfo]);

    if (window.localStorage.getItem('user'))
    {
        return (
            <div id='loggedStateDiv'>
                { window.localStorage.getItem('user') && viewUserInfo ? <FlotantWindow><UserInfo setUser={ setUser } setViewUserInfo={ setViewUserInfo }/></FlotantWindow> : null}

                <button id="stateLoginTouchable" onClick={() => {if(window.localStorage.getItem('user')){setViewUserInfo(true);}}}>
                    <p>
                        { JSON.parse(window.localStorage.getItem('user')).name }
                    </p>
                </button>
            </div>
        );
    }
    else return 'error';
};

export default StateLogged;