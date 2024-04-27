const BlogInfo = ({ blog }) => {
    return (
        <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
        </div>
    );
};

export default BlogInfo;