import { useState } from 'react'

const Button = ({callback, text}) => {
  return (
      <button onClick={callback}>{text}</button>
  );
};

const Anecdote = ({title, anecdote, votes}) => {
  return (
    <div>
      <h1>{title}</h1>
      {anecdote}
      <p>Has {votes} votes.</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])

  const randomAnectote = () => {
    let new_selected = selected;
    while(new_selected == selected)
    {
      new_selected = Math.floor(Math.random() * (anecdotes.length-1));
    }
    setSelected(new_selected);
  };
  const voteAnecdote = () => {
    setVotes(votes.concat(selected));
  };
  const getMostVotedAnecdote = () => {
    let anecdote = {number: -1, repeat: 0}
    for(let i = 0; i < anecdotes.length; i++)
    {
      let repeat_index = votes.filter(e => e==i).length;
      if (anecdote.number == -1)
      {
        anecdote.number = i;
        anecdote.repeat = repeat_index;
      }
      else
      {
        if ( repeat_index > anecdote.repeat )
        {
          anecdote.number = i;
          anecdote.repeat = repeat_index;
        }
      }
    }
    return anecdote.number;
  };
  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes.filter(e => e==selected).length}/>
      <Button callback={voteAnecdote} text="Vote"/>
      <Button callback={randomAnectote} text="Next anecdote"/>
      <Anecdote title="Anecdote with most votes" anecdote={anecdotes[getMostVotedAnecdote()]} votes={votes.filter(e => e==getMostVotedAnecdote()).length}/>
    </div>
  )
}

export default App