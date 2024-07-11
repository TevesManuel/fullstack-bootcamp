import { useState } from 'react';
import NewBlogForm from './NewBlogForm';
import FlotantWindow from '../../utils/FlotantWindow';
import { useUserValue } from '../../../context/user';

const NewBlogButton = () => {
    const [viewForm, setViewForm] = useState(false);
    const user = useUserValue();
    const handleClick = () => {
        if(user)
        {
            setViewForm(true);
        }
    };
    return (
        <div>
            {viewForm ?
                <FlotantWindow setViewFn={setViewForm}>
                    <NewBlogForm setViewForm={setViewForm} />
                </FlotantWindow>
            :   null}
            <button
                onClick={handleClick}
                id='newBlogButton'
                className={localStorage.getItem('user') ? 'abg' : 'ubg'}
            >
                +
            </button>
        </div>
    );
};

import PropTypes from 'prop-types';

NewBlogButton.propTypes = {};
export default NewBlogButton;
