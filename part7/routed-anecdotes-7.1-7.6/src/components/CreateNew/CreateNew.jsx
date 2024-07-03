/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import useField from '../../Hooks/useField/useField';

const CreateNew = (props) => {
    const { reset: resetContent, ...content } = useField('text');
    const { reset: resetAuthor, ...author } = useField('text');
    const { reset: resetInfo, ...info } = useField('text');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
        if(props.setNotification)
        {
            props.setNotification(`A new anecdote "${content.value}" has been created!`);
            setTimeout(() => {
                props.setNotification('');
            }, 5000);
            navigate('/');
        }
    };

    const resetValues = () => {
        resetContent();
        resetAuthor();
        resetInfo();
        // content.onChange({ target:{ value:'' } })
        // author.onChange({ target:{ value:'' } })
        // info.onChange({ target:{ value:'' } })
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
          content
                    <input {...content} />
                </div>
                <div>
          author
                    <input {...author} />
                </div>
                <div>
          url for more info
                    <input {...info} />
                </div>
                <button>create</button>
            </form>
            <button onClick={resetValues}>reset</button>
        </div>
    );

};

export default CreateNew;