import { useState } from 'react';

import blogService from '../../../services/blogs';

import ez from '../../../utils/ez';

import { toast } from 'react-toastify';
import config from '../../../utils/config';
import { useQueryClient } from '@tanstack/react-query';

const NewBlogForm = ({ setViewForm }) => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogUrl, setBlogUrl] = useState('');

    //Dont use useMutation for react tostify
    // const createBlog = useMutation({
    //     mutationFn: blogService.create,
    //     onSuccess: (newBlog) => {
    //         queryClient.invalidateQueries(['blogs']);//Then i download all the blogs again
    //         //Thats generate an error on the delete action
    //         // const blogs = queryClient.getQueryData(['blogs']);
    //         // queryClient.setQueryData(['blogs'], blogs.concat(data));
    //         setViewForm(false);

    //     }
    // })

    const queryClient = useQueryClient();

    const handleCreate = (e) => {
        e.preventDefault();
        toast.promise(
            blogService
                .create({
                    author: JSON.parse(localStorage.getItem('user')).name,
                    username: JSON.parse(localStorage.getItem('user')).username,
                    title: blogTitle,
                    url: blogUrl,
                })
                .then((data) => {
                    // console.log('data', data);
                    queryClient.invalidateQueries(['blogs']); //Then i download all the blogs again
                    //Thats generate an error on the delete action
                    // const blogs = queryClient.getQueryData(['blogs']);
                    // queryClient.setQueryData(['blogs'], blogs.concat(data));
                    setViewForm(false);
                }),
            {
                pending: 'Uploading the blog',
                success: 'Blog uploaded',
                error: 'Error uploading blog',
            },
            config.NOTIFICATION_CONFIG,
        );
    };
    return (
        <div className='centerContent'>
            <form onSubmit={handleCreate} id='NewBlogForm'>
                <div>
                    Title
                    <input
                        autoComplete='off'
                        type='text'
                        value={blogTitle}
                        name='blogTitle'
                        onChange={ez.textInputFnGen(setBlogTitle)}
                    />
                </div>
                <div>
                    URL
                    <input
                        autoComplete='off'
                        type='text'
                        value={blogUrl}
                        name='blogUrl'
                        onChange={ez.textInputFnGen(setBlogUrl)}
                    />
                </div>
                <div className='centerContent'>
                    <button type='submit' id='submitBlogButton'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

import PropTypes from 'prop-types';

NewBlogForm.propTypes = {
    setViewForm: PropTypes.func.isRequired,
};

export default NewBlogForm;
