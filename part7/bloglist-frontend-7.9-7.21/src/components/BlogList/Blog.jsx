import { useState } from 'react';
import FlotantWindow from './../utils/FlotantWindow';
import BlogInfo from './BlogInfo/BlogInfo';

const Blog = ({ blog, updateBL }) => {
    const [view, setView] = useState(false);

    const middlewareSetView = (newState) => {
        setView(newState);
        updateBL();
    };

    const handleClick = () => {
        setView(true);
    };

    if (!view) {
        return (
            <aside onClick={handleClick}>
                <h2>Title: </h2>
                <p>{blog.title}</p>
                <h2>Author: </h2>
                <p>{blog.author}</p>
            </aside>
        );
    } else {
        return (
            <div>
                <aside onClick={handleClick}>
                    {blog.title} {blog.author}
                </aside>
                <FlotantWindow setViewFn={middlewareSetView}>
                    <BlogInfo blog={blog} setViewFn={middlewareSetView} />
                </FlotantWindow>
            </div>
        );
    }
};

import PropTypes from 'prop-types';

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBL: PropTypes.func.isRequired,
};

export default Blog;
