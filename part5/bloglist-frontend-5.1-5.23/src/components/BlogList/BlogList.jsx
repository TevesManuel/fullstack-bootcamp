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


    const [updateFlag, setUpdateFlag] = useState(false);

    // Función para actualizar BlogList
    const updateBlogList = () => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => a.likes - b.likes).reverse() )
        );
        setUpdateFlag(!updateFlag); // Cambia el estado para forzar una actualización
    };

    return (
        <div>
            <section>
                <header>
                    <h2>Blogs</h2>
                </header>
                { blogs.map(blog => <Blog updateBL={updateBlogList} key={blog.id} blog={blog} />) }
            </section>
            <NewBlogButton blogs={blogs} setBlogs={setBlogs}/>
        </div>
    );
};

export default BlogList;