import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer, { initializeAnecdotes } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
});

store.dispatch(initializeAnecdotes());

export default store;