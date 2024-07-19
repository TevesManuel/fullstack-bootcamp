import {useParams} from 'react-router-dom';

import { useEffect, useState } from 'react';

import blogService from './../../services/blogs'

import BlogInfo from '../BlogList/BlogInfo/BlogInfo';

import FlotantWindow from '../utils/FlotantWindow';

const Blog = () => 
{
    const [blog, setBlog] = useState(null);

    const targetId = useParams().id;
    useEffect(() => {
        blogService.getAll().then(response => setBlog(response.filter(iterBlog => iterBlog.id == targetId)[0]));
    }, []);

    if(!blog)
    {
        return (
            <h1>Fetching blog info...</h1>
        );
    }
    else
    {
        return (
            <FlotantWindow setViewFn={()=>{}}>
                <BlogInfo blog={blog} setViewFn={()=>{}} />
            </FlotantWindow>
        );
    }
};

export default Blog;