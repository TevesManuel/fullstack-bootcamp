import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import userService from './../../services/users';

import BlogList from './../BlogList/BlogList';

const User = () => {
    const [user, setUser] = useState(null);

    const targetId = useParams().id;
    useEffect(() => {
        userService
            .getAll()
            .then((response) =>
                setUser(
                    response.data.filter(
                        (iterUser) => iterUser.id == targetId,
                    )[0],
                ),
            );
    }, []);

    if (!user) {
        return <h1>Fetching user info...</h1>;
    } else {
        return (
            <div>
                <BlogList
                    title={`${user.username} blogs`}
                    blogsArgv={user.blogs}
                />
            </div>
        );
    }
};

export default User;
