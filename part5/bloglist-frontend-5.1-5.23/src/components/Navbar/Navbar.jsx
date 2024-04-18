import StateLogged from './StateLogin/StateLogged/StateLogged';
import StateUnlogged from './StateLogin/StateUnlogged/StateUnlogged';

const Navbar = ({ user, setUser }) => {
    return (
        <div id='titleContainer'>
            <h2 id='titleText'>BlogApp</h2>
            <div id='stateLogin'>
                {
                    user ?
                        <StateLogged setUser={setUser}/> :
                        <StateUnlogged setUser={setUser}/>
                }
            </div>
        </div>
    );
};

export default Navbar;