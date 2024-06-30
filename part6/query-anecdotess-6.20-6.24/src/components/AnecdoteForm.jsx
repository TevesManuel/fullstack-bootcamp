import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from './../requests/anecdotes';
import { useNotificationDispatch } from './../Context/Notification';

const AnecdoteForm = () => {

    const queryClient =  useQueryClient();

    const dispatch = useNotificationDispatch();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
            dispatch({ type: 'SET', payload: { content: `You created ${newAnecdote.content}.`, lastTime: Date.now() } });
            setTimeout(() => {
                dispatch({ type: 'RESET' });
            }, 5000);
        },
        onError: () => {
            dispatch({ type: 'SET', payload: { content: 'Too short anecdote, must have length 5 or more', lastTime: Date.now() } });
            setTimeout(() => {
                dispatch({ type: 'RESET' });
            }, 5000);
        }
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate(content);
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' minLength="5" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
