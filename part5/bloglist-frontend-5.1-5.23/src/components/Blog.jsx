const Blog = ({ blog }) => {
    return (
        <aside>
            {blog.title} {blog.author}
        </aside>
    );
};

export default Blog;