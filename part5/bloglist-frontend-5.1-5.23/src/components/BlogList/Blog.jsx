import { useState } from 'react';
import FlotantWindow from './../utils/FlotantWindow';
import BlogInfo from './BlogInfo/BlogInfo';

const Blog = ({ blog }) => {

    const [view, setView] = useState(false);

    const handleClick = () => {
        setView(true);
    };

    if (!view)
    {
        return (
            <aside onClick={handleClick}>
                {blog.title} {blog.author}
            </aside>
        );
    }
    else
    {
        return (
            <div>
                <aside onClick={handleClick}>
                    {blog.title} {blog.author}
                </aside>
                <FlotantWindow setViewFn={setView}><BlogInfo blog={blog}/></FlotantWindow>
            </div>
        );
    }
};

export default Blog;