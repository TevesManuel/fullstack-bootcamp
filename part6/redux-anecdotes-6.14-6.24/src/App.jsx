import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useEffect } from 'react';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    return (
        <div>
            <Filter/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    );
};

export default App;