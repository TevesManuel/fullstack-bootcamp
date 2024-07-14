import Blog from './Blog';

import blogService from './../../services/blogs';
import NewBlogButton from './NewBlogButton/NewBlogButton';
import { useQuery } from '@tanstack/react-query';

const BlogList = () => {
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
    });

    if (result.isLoading) {
        return (
            <div>
                <h1>Loading blogs...</h1>
            </div>
        );
    }
    if (result.isError) {
        return (
            <div>
                <h1>Blog service not avaible due to problem in server.</h1>
            </div>
        );
    }

    const blogs = result.data.sort((a, b) => a.likes - b.likes).reverse();

    return (
        <div>
            <section>
                <header>
                    <h2>Blogs</h2>
                </header>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </section>
            <NewBlogButton />
        </div>
    );
};

export default BlogList;
