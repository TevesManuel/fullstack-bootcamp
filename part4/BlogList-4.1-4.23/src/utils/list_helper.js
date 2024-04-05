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

module.exports.dummy = dummy;
module.exports.totalLikes = totalLikes;