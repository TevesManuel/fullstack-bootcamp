const express = require('express');
const app = express()

const morgan = require('morgan');

const PORT = 3001;

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    response.json(persons.find(person => person.id == request.params.id));
});

app.delete('/api/persons/:id', (request, response) => {
    console.log(`New petition for DELETE ${request.params.id} ID person.`);
    console.log(persons.length);
    persons = persons.filter(person => person.id != request.params.id);
    console.log(persons.length);
    response.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});