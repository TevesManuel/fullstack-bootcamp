import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from './../reducers/anecdoteReducer';
import Notification from './../components/Notification';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () =>
{
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase())))
        .sort((a, b) => b.votes - a.votes);
    console.log(anecdotes);

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        // eslint-disable-next-line no-useless-escape
        dispatch(setNotification(`You voted \"${anecdote.content}\"`, 4000));
    };

    return (
        <>
            <Notification/>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};
export default AnecdoteList;