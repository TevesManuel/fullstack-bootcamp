import blogService from './../../services/blogs';
import { useState } from 'react';
import userService from './../../services/users';

import {Link} from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    userService.getAll().then(response => setUsers(response.data.sort((a, b) => a.blogs.length - b.blogs.length).reverse()));

    if(!users)
    {
        return (
            <div>
                <h1>Fetching users...</h1>
            </div>
        );
    }
    return (
        <div>
            <h3>Users</h3>
            <table>
                <tr>
                    <th>Full name</th>
                    <th>Blogs created</th>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default UserList;
