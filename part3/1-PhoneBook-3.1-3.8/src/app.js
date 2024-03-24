const express = require('express');
const app = express()

const crypto = require('crypto');

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

app.use(express.json());

app.use(morgan(function (tokens, req, res) {
    console.log(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms ',
      `${JSON.stringify(req.body)}`,
    ];
  }));

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

app.post('/api/persons/', (request, response) => {
    // console.log(`ID: ${crypto.randomUUID()}`);
    // console.log(`Is defined name ${request.body.name}, number ${request.body.number}`);
    if(request.body.name == null)
    {
      response.send("You need specify name field");
      response.status(400);
      response.end();
    }
    else if(request.body.number == null)
    {
      response.send("You need specify number field");
      response.status(400);
      response.end();
    }
    else if(persons.find(person => person.name == request.body.name)) 
    {
      response.send("Name already exists");
      response.status(400);
      response.end();
    }
    else
    {
      persons = persons.concat({
        name: request.body.name,
        number: request.body.number,
        id: Math.ceil(Math.random()*1000),
      });
      response.status(200);
      response.end();  
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});