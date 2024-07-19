import StateLogged from './StateLogin/StateLogged/StateLogged';
import StateUnlogged from './StateLogin/StateUnlogged/StateUnlogged';

import UserContext from '../../context/user';
import { useContext, useEffect } from 'react';

import {Link} from 'react-router-dom';

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
            <div>
                <Link to="/" id='titleText'>BlogApp</Link>
                <Link to="/users/" style={{'display': 'inline-flex', 'flex': 0, margin: 0, paddingLeft: '10px'}}>Usuarios</Link>
            </div>
            <div id='stateLogin'>
                {!!user ?
                    <StateLogged />
                :   <StateUnlogged />}
            </div>
        </div>
    );
};

export default Navbar;
