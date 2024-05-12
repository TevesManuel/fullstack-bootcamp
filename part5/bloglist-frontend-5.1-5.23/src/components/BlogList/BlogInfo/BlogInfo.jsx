import { useState } from 'react';
import blogService from './../../../services/blogs';

const BlogInfo = ({ blog }) => {
    const [likes, setLike] = useState(blog.likes);
    const like_callback = () => {
        console.log(blog);
        blog.likes += 1;
        // blog = blogService.update(blog).then((resp) => console.log(resp));
        setLike(blog.likes);
    };
    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255)', width: '30vw', padding:'5%', position: 'relative' }}>
            <h2 style={{ margin: 0 }}>Title of the blog:</h2>
            <p>{blog.title}</p>
            <h2 style={{ margin: 0 }}>Author:</h2>
            <p>{blog.author}</p>
            <h2 style={{ margin: 0 }}>Link to the blog:</h2>
            <a href={blog.url}>{blog.url}</a>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '110px' }}>
                <p style={{ display: 'inline' }}>{likes}</p>
                <button onClick={like_callback} className="likeButton">♥</button>
            </div>
        </div>
    );
};

export default BlogInfo;