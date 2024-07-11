import config from '../../../../utils/config';

import { toast } from 'react-toastify';

import { useUserValue, useUserDispatch } from '../../../../context/user';

const UserInfo = ({ setViewUserInfo }) => {
    const user = useUserValue();
    const userDispatch = useUserDispatch();

    return (
        <div
            style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <button
                style={{ backgroundColor: 'red', border: 'red' }}
                onClick={() => {
                    toast.info(
                        `See you later ${user.name}`,
                        config.NOTIFICATION_CONFIG,
                    );
                    userDispatch({type: 'LOGOUT'});
                    setViewUserInfo(false);
                }}
            >
                Logout
            </button>
        </div>
    );
};

import PropTypes from 'prop-types';

UserInfo.propTypes = {
    setViewUserInfo: PropTypes.func.isRequired,
};

export default UserInfo;
