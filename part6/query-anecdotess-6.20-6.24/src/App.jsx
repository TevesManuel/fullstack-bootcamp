import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests/anecdotes';
import { useNotificationDispatch } from './Context/Notification';
const App = () => {

    const queryClient =  useQueryClient();

    const dispatch = useNotificationDispatch();

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote));
            dispatch({ type: 'SET', payload: { content: `You voted ${newAnecdote.content}.`, lastTime: Date.now() } });
            setTimeout(() => {
                dispatch({ type: 'RESET' });
            }, 5000);
        }
    });

    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    };
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    });

    if(result.isLoading)
    {
        return (
            <div>
                <h1>Loading anecdotes...</h1>
            </div>
        );
    }
    if(result.isError)
    {
        return (
            <div>
                <h1>Anecdote service not avaible due to problem in server.</h1>
            </div>
        );
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
            has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
