import { useState } from 'react';
import blogService from './../../../services/blogs';

import { toast } from 'react-toastify';
import config from './../../../utils/config';

import ConfirmWindow from './../../utils/ConfirmWindow';

const BlogInfo = ({ blog, setViewFn }) => {
    const [likes, setLike] = useState(blog.likes);
    console.log(window.localStorage.getItem('user'));
    const likeCallback = () => {
        // console.log(blog);
        blog.likes += 1;
        blogService.update({ 'likes': blog.likes }, blog.id).then(() => setLike(blog.likes));
    };

    const deleteCallback = () => {
        if(JSON.parse(localStorage.getItem('user')).username === blog.user.username)
        {
            setViewFn(false);
            toast.promise(
                blogService.remove(blog.id).then((data) => {
                    if(data === 204)
                        setViewFn(false);
                    return data;
                })
                ,{
                    pending: 'Waiting',
                    success: {
                        render({ data }){
                            return `Hello ${data}`;
                        }
                    },
                    error: 'Erron removing the blog.',
                }, config.NOTIFICATION_CONFIG);
        }
    };

    const formatStr = (str, max_length) => {
        let out = '';

        for(let i = 0; i < str.length; i++)
        {
            if(i === max_length)
            {
                out = out.concat('...');
            }
            else if(i < max_length)
            {
                out = out.concat(str[i]);
            }
        }
        return out;
    };

    return (
        <div className='BlogInfo'>
            <h2 style={{ margin: 0 }}>Title of the blog:</h2>
            <p>{blog.title}</p>
            <h2 style={{ margin: 0 }}>Author:</h2>
            <p>{blog.author}</p>
            <h2 style={{ margin: 0 }}>Link to the blog:</h2>
            <a href={blog.url} target='_blank' rel="noreferrer">{formatStr(blog.url, 30)}</a>
            <div className='bottomDivBlogInfo'>
                <a className={ JSON.parse(localStorage.getItem('user')).username === blog.user.username ? 'BlogInfoDelete auth' : 'BlogInfoDelete unauth'} onClick={deleteCallback}>DELETE</a>
                <h2 style={{ textAlign: '-webkit-center', display: 'inline' }}>{likes}</h2>
                <button onClick={likeCallback} className="likeButton">♥</button>
            </div>
        </div>
    );
};

export default BlogInfo;