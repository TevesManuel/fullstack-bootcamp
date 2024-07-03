import { Link } from 'react-router-dom';

const Menu = () => {
    const padding = {
        padding: '5px'
    };
    return (
        <div>
            <div>
                <Link style={padding} to="/">anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
            </div>
        </div>
    );
};

export default Menu;