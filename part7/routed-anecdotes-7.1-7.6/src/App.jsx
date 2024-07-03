/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
    Routes, Route,
    useMatch
} from 'react-router-dom';

import Footer from './components/Footer/Footer';
import AnecdoteList from './components/AnecdotesList/AnecdotesList';
import CreateNew from './components/CreateNew/CreateNew';
import Menu from './components/Menu/Menu';
import About from './components/About/About';
import OneAnecdote from './components/OneAnecdote/OneAnecdote';
import Notification from './components/Notification/Notification';

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ]);

    const match = useMatch('/anecdotes/:id'); // Is most important app inside of <Router>
    const anecdote = match
        ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
        : null;

    const [notification, setNotification] = useState('');

    const addNew = (anecdote) => {
        console.log(anecdote);
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    };

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu></Menu>
            <Notification notification={ notification }/>

            <Routes>
                <Route path="/anecdotes/:id" element={<OneAnecdote anecdote={anecdote} />} />
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew setNotification={setNotification} addNew={addNew} />} />
                <Route path="/about" element={<About/>} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
