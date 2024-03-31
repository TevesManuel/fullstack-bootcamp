const express = require('express');
const app = express()

const morgan = require('morgan');

const PORT = 3000;

const phoneController = require('./Controllers/Phone');
const phoneModel      = require('./Models/Phone');

let persons = phoneController.getAllPhones();
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
      let new_person = phoneModel({
        name: request.body.name,
        number: request.body.number,
      });
      persons = persons.concat(new_person);
      phoneController.createPhone(new_person);
      response.status(200);
      response.json(new_person);
      response.end();  
    }
});

app.put('/api/persons/:id', (request, response) => {
  response.json(phoneController.getPhoneById(request.params.id));
  response.status(200);
  response.end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});