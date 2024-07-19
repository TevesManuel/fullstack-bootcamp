import { useState } from 'react';
import UserInfo from './UserInfo';
import FlotantWindow from '../../../utils/FlotantWindow';

import { useUserValue } from '../../../../context/user';

const StateLogged = () => {
    const [viewUserInfo, setViewUserInfo] = useState(false);
    const user = useUserValue();

    console.log('user.name', user.name);

    if (user) {
        return (
            <div id='loggedStateDiv'>
                {user && viewUserInfo ?
                    <FlotantWindow setViewFn={setViewUserInfo}>
                        <UserInfo setViewUserInfo={setViewUserInfo} />
                    </FlotantWindow>
                :   null}

                <button
                    id='stateLoginTouchable'
                    onClick={() => {
                        if (user) {
                            setViewUserInfo(true);
                        }
                    }}
                >
                    <p>{user.name}</p>
                </button>
            </div>
        );
    } else return 'error';
};

export default StateLogged;
