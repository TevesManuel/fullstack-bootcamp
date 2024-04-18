import config from '../../../../utils/config';

import { toast } from 'react-toastify';

const UserInfo = ({ setViewUserInfo }) => {
    return (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p>Name: {JSON.parse(window.localStorage.getItem('user')).name}</p>
            <p>Username: {JSON.parse(window.localStorage.getItem('user')).username}</p>
            <button style={{ backgroundColor: 'red', border: 'red' }}onClick={() => {
                toast.info(`See you later ${JSON.parse(window.localStorage.getItem('user')).name}`, config.NOTIFICATION_CONFIG);
                window.localStorage.removeItem('user');
                setViewUserInfo(false);
            }}>Logout</button>
            <button onClick={() => setViewUserInfo(false)}>Close</button>
        </div>
    );
};

export default UserInfo;