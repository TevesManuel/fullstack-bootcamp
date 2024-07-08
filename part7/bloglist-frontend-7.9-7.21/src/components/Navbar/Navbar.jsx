import StateLogged from './StateLogin/StateLogged/StateLogged';
import StateUnlogged from './StateLogin/StateUnlogged/StateUnlogged';

const Navbar = ({ isLogged, setIsLogged }) => {
    return (
        <div id='titleContainer'>
            <h2 id='titleText'>BlogApp</h2>
            <div id='stateLogin'>
                {isLogged ?
                    <StateLogged setIsLogged={setIsLogged} />
                :   <StateUnlogged setIsLogged={setIsLogged} />}
            </div>
        </div>
    );
};

import PropTypes from 'prop-types';

Navbar.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    setIsLogged: PropTypes.func.isRequired,
};

export default Navbar;
