const UserInfo = ({ setToastMessage, setViewUserInfo }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p>Name: {JSON.parse(window.localStorage.getItem('user')).name}</p>
                <p>Username: {JSON.parse(window.localStorage.getItem('user')).username}</p>
                <button style={{ backgroundColor: 'red', border: 'red' }}onClick={() => {
                    setToastMessage({ message: `See you later ${JSON.parse(window.localStorage.getItem('user')).name}`, type: 'normal' });
                    window.localStorage.setItem('user', '');
                    setViewUserInfo(false);
                }}>Logout</button>
            </div>
        </div>
    );
};

export default UserInfo;