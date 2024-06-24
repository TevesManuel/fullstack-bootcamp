import { useDispatch } from 'react-redux';
import { newAnecdote } from './../reducers/anecdoteReducer';
import { useState } from 'react';
const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const [anecdote, setAnecdote] = useState('');

    // UNCONTROLLED FORM
    // const newCbk = (event) => {
    //     event.preventDefault();
    //     const content = event.target.anecdote.value;
    //     event.target.anecdote.value = '';
    //     dispatch(newAnecdote(content));
    // };
    //Controlled form use onChange in the input & save the content of the input in an state

    const handlerAnecdoteInput = (event) => {
        setAnecdote(event.target.value);
    };

    //Controlled form
    const newCbk = (event) => {
        event.preventDefault();
        dispatch(newAnecdote(anecdote));
        setAnecdote('');
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newCbk}>
                <div><input name='anecdote' value={anecdote} onChange={handlerAnecdoteInput} /></div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;