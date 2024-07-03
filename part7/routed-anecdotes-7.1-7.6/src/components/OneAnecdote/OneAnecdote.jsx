/* eslint-disable react/prop-types */
const OneAnecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>Has {anecdote.votes} votes.</p>
        </div>
    );
};

export default OneAnecdote;