import { useDispatch } from 'react-redux';
import { createAnecdote } from './../reducers/anecdoteReducer';
import { useState } from 'react';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const [anecdote, setAnecdote] = useState('');

    const handlerAnecdoteInput = (event) => {
        setAnecdote(event.target.value);
    };

    const newCbk = (event) => {
        event.preventDefault();
        dispatch(createAnecdote(anecdote));
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