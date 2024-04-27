import { useState } from 'react';
import NewNoteForm from './NewBlogForm';
import FlotantWindow from '../../utils/FlotantWindow';

const NewBlogButton = ({ blogs, setBlogs }) =>
{
    const [viewForm, setViewForm] = useState(false);
    const handleClick = () => {
        setViewForm(true);
    };
    return (
        <div>
            {viewForm ? <FlotantWindow setViewFn={ setViewForm }><NewNoteForm setViewForm={setViewForm} blogs={blogs} setBlogs={setBlogs}/></FlotantWindow> : null}
            <button onClick={handleClick} id='newBlogButton' className={localStorage.getItem('user') ? 'abg' : 'ubg'}>+</button>
        </div>
    );
};

export default NewBlogButton;