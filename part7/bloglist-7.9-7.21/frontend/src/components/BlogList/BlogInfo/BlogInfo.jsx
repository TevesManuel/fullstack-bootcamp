import { useState } from 'react';
import blogService from './../../../services/blogs';

import { toast } from 'react-toastify';
import config from './../../../utils/config';

import ConfirmWindow from './../../utils/ConfirmWindow';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const BlogInfo = ({ blog, setViewFn }) => {
    const [confirmView, setConfirmView] = useState(false);
    const [commentsView, setCommentsView] = useState(false);
    const [commentInput, setCommentInput] = useState('');

    const queryClient = useQueryClient();

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: () => {
            const blogs = queryClient.getQueryData(['blogs']);
            queryClient.setQueryData(
                ['blogs'],
                blogs.map((iterBlog) =>
                    iterBlog.id === blog.id ?
                        { ...blog, likes: blog.likes + 1 }
                    :   iterBlog,
                ),
            );
        },
    });

    const likeCallback = () => {
        updateBlogMutation.mutate({
            data: { likes: blog.likes + 1 },
            id: blog.id,
        });
    };

    const deleteCallback = () => {
        if (
            JSON.parse(localStorage.getItem('user')).username ===
            blog.user.username
        ) {
            setViewFn(false);
            toast.promise(
                blogService.remove(blog.id).then((data) => {
                    //Dont use useMutation for react toastify
                    const blogs = queryClient.getQueryData(['blogs']);
                    queryClient.setQueryData(
                        ['blogs'],
                        blogs.filter((iterBlog) => iterBlog.id !== blog.id),
                    );
                    if (data === 204) setViewFn(false);
                    return data;
                }),
                {
                    pending: 'Waiting',
                    success: {
                        render({ data }) {
                            return `The blog has been removed.`;
                        },
                    },
                    error: 'Erron removing the blog.',
                },
                config.NOTIFICATION_CONFIG,
            );
        }
    };

    const formatStr = (str, max_length) => {
        if (str) {
            let out = '';

            for (let i = 0; i < str.length; i++) {
                if (i === max_length) {
                    out = out.concat('...');
                } else if (i < max_length) {
                    out = out.concat(str[i]);
                }
            }
            return out;
        }
    };

    const checkUser = () => {
        if (localStorage.getItem('user'))
            return (
                JSON.parse(localStorage.getItem('user')).username ===
                blog.user.username
            );
        else return false;
    };

    return (
        <div className='BlogInfo'>
            <h2 style={{ margin: 0 }}>Title of the blog:</h2>
            <p>{blog.title}</p>
            <h2 style={{ margin: 0 }}>Author:</h2>
            <p>{blog.author}</p>
            <h2 style={{ margin: 0 }}>Link to the blog:</h2>
            <a href={blog.url} target='_blank' rel='noreferrer'>
                {formatStr(blog.url, 30)}
            </a>
            <div className='bottomDivBlogInfo'>
                <button onClick={() => setCommentsView(!commentsView)}>
                    comments
                </button>
                <a
                    className={
                        checkUser() ?
                            'BlogInfoDelete auth'
                        :   'BlogInfoDelete unauth'
                    }
                    onClick={() => setConfirmView(true)}
                >
                    DELETE
                </a>
                <h2 style={{ textAlign: '-webkit-center', display: 'inline' }}>
                    {blog.likes}
                </h2>
                <button onClick={likeCallback} className='likeButton'>
                    ♥
                </button>
            </div>
            {commentsView ?
                <FlotantWindow setViewFn={setCommentsView}>
                    <div className='commentWindow'>
                        <header>{`comments of \"${blog.title}\"`}</header>
                        <main>
                            {blog.comments.map((comment, i) =>
                                comment.text ?
                                    <li key={`${blog.id}/${i}`}>
                                        {comment.text}
                                    </li>
                                :   null,
                            )}
                        </main>
                        <footer>
                            <input
                                type='text'
                                value={commentInput}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setCommentInput(e.target.value);
                                }}
                            />
                            <button
                                onClick={() => {
                                    toast.promise(
                                        blogService
                                            .comment(blog.id, commentInput)
                                            .then(() => {
                                                setCommentInput('');
                                                queryClient.invalidateQueries([
                                                    'blogs',
                                                ]); //Then i download all the blogs again
                                            }),
                                        {
                                            pending: 'Uploading comment',
                                            success:
                                                'Comment has been uploaded',
                                            error: 'Error to upload comment.',
                                        },
                                        config.NOTIFICATION_CONFIG,
                                    );
                                }}
                            >
                                Submit
                            </button>
                        </footer>
                    </div>
                </FlotantWindow>
            :   null}
            <ConfirmWindow
                callback={deleteCallback}
                view={confirmView}
                setViewFn={setConfirmView}
            >
                Do you like delete this blog?
            </ConfirmWindow>
        </div>
    );
};

import PropTypes from 'prop-types';
import FlotantWindow from '../../utils/FlotantWindow';

BlogInfo.propTypes = {
    blog: PropTypes.object.isRequired,
    setViewFn: PropTypes.func.isRequired,
};

export default BlogInfo;
