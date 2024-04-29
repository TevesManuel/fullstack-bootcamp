const BlogInfo = ({ blog }) => {
    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255)', width: '30vw', padding:'5%' }}>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            {/* <svg className='likeSVG' viewBox='0 0 270 270' width='270' height='270' preserveAspectRatio="xMidYMid meet" xmlns='./../public/svg/like.svg'></svg> */}
            {/* <svg className='likeSVG' xmlns='./../public/svg/like.svg'></svg> */}
            {/* <object className='likeSVG' data='./../public/svg/like.svg' type='image/svg+xml'></object> */}
            <object className='likeSVG' data='./../public/svg/like.svg'></object>
        </div>
    );
};

export default BlogInfo;