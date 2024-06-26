import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from './../reducers/anecdoteReducer';
import Notification from './../components/Notification';
import { setNotificationText, cleanNotification } from '../reducers/notificationReducer';

const AnecdoteList = () =>
{
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase())))
        .sort((a, b) => b.votes - a.votes);
    console.log(anecdotes);

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id));
        // eslint-disable-next-line no-useless-escape
        dispatch(setNotificationText(`You voted \"${anecdote.content}\"`));
        setTimeout(() => dispatch(cleanNotification()), 4000);
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