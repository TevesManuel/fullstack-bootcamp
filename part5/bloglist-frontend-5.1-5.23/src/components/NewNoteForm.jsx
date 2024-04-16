import { useState } from 'react';

import blogService from './../services/blogs';

import ez from './../utils/ez';

import { toast } from 'react-toastify';
import config from '../utils/config';


const NewNoteForm = ({ blogs, setBlogs }) => {

    const [blogTitle, setBlogTitle] = useState('');
    const [blogUrl, setBlogUrl] = useState('');


    const handleCreate = (e) => {
        e.preventDefault();
        toast.promise(blogService.create({
            author: JSON.parse(localStorage.getItem('user')).name,
            username: JSON.parse(localStorage.getItem('user')).username,
            title: blogTitle,
            url: blogUrl,
        }).then(response =>
            setBlogs(blogs.concat(response))
        ),
        {
            pending: 'Uploading the blog',
            success: 'Blog uploaded',
            error: 'Error uploading blog'
        }, config.NOTIFICATION_CONFIG);
    };
    return(
        <div className="centerContent">
            <form onSubmit={handleCreate} id='newNoteForm'>
                <div>
    Title
                    <input
                        autoComplete="off"
                        type="text"
                        value={blogTitle}
                        name="blogTitle"
                        onChange={ez.textInputFnGen(setBlogTitle)}
                    />
                </div>
                <div>
    URL
                    <input
                        autoComplete="off"
                        type="text"
                        value={blogUrl}
                        name="blogUrl"
                        onChange={ez.textInputFnGen(setBlogUrl)}
                    />
                </div>
                <div className="centerContent">
                    <button type="submit" id='submitBlogButton'>Submit</button>
                </div>
            </form>
        </div>
    );
};
export default NewNoteForm;