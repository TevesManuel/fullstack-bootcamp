// Redux Toolkit

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        appendAnecdote(state, action) {
            return state.concat(action.payload);
        },
        voteAnecdote(state, action) {
            return state.map(anecdote => anecdote.id !== action.payload ? anecdote : { ...anecdote, votes: anecdote.votes + 1 });
        },
        setAnecdotes(state, action) {
            return action.payload;
        }
    },
});

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;

// Redux Thunk

import anecdoteService from './../services/anecdotes';

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

import { setNotificationText, cleanNotification } from './../reducers/notificationReducer';

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
        // eslint-disable-next-line no-useless-escape
        dispatch(setNotificationText(`You created an anecdote \"${newAnecdote.content}\"`));
        setTimeout(() => dispatch(cleanNotification()), 4000);
    };
};

export default anecdoteSlice.reducer;