module.exports.info = (...out) => {
    if (process.env.NODE_ENV !== 'test')
        console.log(...out);
};