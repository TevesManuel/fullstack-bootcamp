/**
 *
 * @param {Blog []} blogs
 */
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
};

/**
 *
 * @param {Blog []} blogs
 */
const totalLikes = (blogs) => {
    return blogs.reduce((sum, act) => {
        return sum + act.likes;
    }, 0);
};

/**
 *
 * @param {Blog []} blogs
 */
const favoriteBlog = (blogs) => {
    let favoriteBlog = blogs[0];
    for(let i = 1; i < blogs.length; i++)
    {
        if(blogs[i].likes > favoriteBlog.likes)
            favoriteBlog = blogs[i];
    }
    return favoriteBlog;
};

/**
*
* @param {Blog []} blogs
*/
const mostBlogs = (blogs) => {
    let authorsBlogs = {};
    blogs.forEach(blog => {
        if(!authorsBlogs[blog.author])
            authorsBlogs[blog.author] = 1;
        else
            authorsBlogs[blog.author]++;
    });

    return {
        author: Object.keys(authorsBlogs).reduce((a, b) => authorsBlogs[a] > authorsBlogs[b] ? a : b),
        blogs: authorsBlogs[Object.keys(authorsBlogs).reduce((a, b) => authorsBlogs[a] > authorsBlogs[b] ? a : b)]
    };
};

/**
*
* @param {Blog []} blogs
*/
const mostLikes = (blogs) => {
    let authorsLikes = {};
    blogs.forEach(blog => {
        if(!authorsLikes[blog.author])
            authorsLikes[blog.author] = blog.likes;
        else
            authorsLikes[blog.author] += blog.likes;
    });

    return {
        author: Object.keys(authorsLikes).reduce((a, b) => authorsLikes[a] > authorsLikes[b] ? a : b),
        blogs: authorsLikes[Object.keys(authorsLikes).reduce((a, b) => authorsLikes[a] > authorsLikes[b] ? a : b)]
    };
};

module.exports.dummy        = dummy;
module.exports.totalLikes   = totalLikes;
module.exports.favoriteBlog = favoriteBlog;
module.exports.mostBlogs    = mostBlogs;
module.exports.mostLikes    = mostLikes;