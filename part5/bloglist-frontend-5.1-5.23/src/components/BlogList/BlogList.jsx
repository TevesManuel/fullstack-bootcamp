import { useState, useEffect } from 'react';

import Blog from './Blog';

import blogService from './../../services/blogs';
import NewBlogButton from './NewBlogButton/NewBlogButton';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    return (
        <div>
            <section>
                <header>
                    <h2>Blogs</h2>
                </header>
                { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
            </section>
            <NewBlogButton blogs={blogs} setBlogs={setBlogs}/>
        </div>
    );
};

export default BlogList;