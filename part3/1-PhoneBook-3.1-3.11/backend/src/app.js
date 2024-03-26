const express = require('express');
const app = express()

const morgan = require('morgan');

const PORT = 3000;

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
app.use(express.static('public'));
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
      let new_person = {
        name: request.body.name,
        number: request.body.number,
        id: Math.ceil(Math.random()*1000),
      };
      persons = persons.concat(new_person);
      response.status(200);
      response.json(new_person);
      response.end();  
    }
});

app.put('/api/persons/:id', (request, response) => {
  let updated_person = request.body;
  persons = persons.map(person => person.id == request.params.id ? updated_person : person);
  response.json(updated_person);
  response.status(200);
  response.end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});