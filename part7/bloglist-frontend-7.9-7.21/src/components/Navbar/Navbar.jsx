import StateLogged from './StateLogin/StateLogged/StateLogged';
import StateUnlogged from './StateLogin/StateUnlogged/StateUnlogged';

import UserContext from '../../context/user';
import { useContext, useEffect } from 'react';

const Navbar = () => {
    const [user, userDispatch] = useContext(UserContext);

    useEffect(() => {
        const savedUser = window.localStorage.getItem('user');
        console.log('effect', savedUser);
        if (savedUser) {
            console.log('entry');
            userDispatch({ type: 'SET', payload: savedUser });
        }
    }, []);

    console.log('user state', user);

    return (
        <div id='titleContainer'>
            <h2 id='titleText'>BlogApp</h2>
            <div id='stateLogin'>
                {!!user ?
                    <StateLogged />
                :   <StateUnlogged />}
            </div>
        </div>
    );
};

export default Navbar;
