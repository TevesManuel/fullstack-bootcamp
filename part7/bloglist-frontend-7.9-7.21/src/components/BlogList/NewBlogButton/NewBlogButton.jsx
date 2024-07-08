import { useState } from 'react';
import NewBlogForm from './NewBlogForm';
import FlotantWindow from '../../utils/FlotantWindow';

const NewBlogButton = ({ setBL }) => {
    const [viewForm, setViewForm] = useState(false);
    const handleClick = () => {
        setViewForm(true);
    };
    return (
        <div>
            {viewForm ?
                <FlotantWindow setViewFn={setViewForm}>
                    <NewBlogForm setViewForm={setViewForm} setBL={setBL} />
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

NewBlogButton.propTypes = {
    setBL: PropTypes.func.isRequired,
};
export default NewBlogButton;
