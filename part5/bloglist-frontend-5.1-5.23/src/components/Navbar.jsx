const Navbar = ({ setViewUserInfo }) => {
    return (
        <div id='titleContainer'>
            <h2 id='titleText'>BlogApp</h2>
            <div id='stateLogin'>
                <button id="stateLoginTouchable" onClick={() => {if(window.localStorage.getItem('user')){setViewUserInfo(true);}}}>
                    <p>
                        {
                            window.localStorage.getItem('user') ?
                                JSON.parse(window.localStorage.getItem('user')).name :
                                'Not logged'
                        }
                    </p>
                </button>
            </div>
        </div>
    );
};

export default Navbar;