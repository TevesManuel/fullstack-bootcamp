import Blog from './Blog';

import blogService from './../../services/blogs';
import NewBlogButton from './NewBlogButton/NewBlogButton';
import { useQuery } from '@tanstack/react-query';

const BlogList = ({ blogsArgv, title }) => {
    let blogs;
    if (!blogsArgv) {
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

        blogs = result.data.sort((a, b) => a.likes - b.likes).reverse();
    } else {
        blogs = blogsArgv;
    }

    return (
        <div>
            <div className='blogList'>
                <header>
                    <h2>{title ? title : 'Blogs'}</h2>
                </header>
                <main>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </main>
            </div>
            <NewBlogButton />
        </div>
    );
};

export default BlogList;
