import { useState, useEffect } from 'react';

import Blog from './Blog';

import blogService from './../../services/blogs';
import NewBlogButton from './NewBlogButton/NewBlogButton';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => a.likes - b.likes).reverse() )
        );
    }, []);

    // Función para actualizar BlogList
    const updateBlogList = () => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => a.likes - b.likes).reverse() )
        );
    };

    return (
        <div>
            <section>
                <header>
                    <h2>Blogs</h2>
                </header>
                { blogs.map(blog => <Blog updateBL={updateBlogList} key={blog.id} blog={blog} />) }
            </section>
            <NewBlogButton setBL={updateBlogList}/>
        </div>
    );
};

export default BlogList;