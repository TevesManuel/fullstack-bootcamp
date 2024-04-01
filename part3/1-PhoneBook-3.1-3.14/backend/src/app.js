const express = require('express');
const app = express()

const morgan = require('morgan');

const PORT = 3000;

const db              = require('./db');
db.setup_db();

process.on('exit', () => {
  db.turn_off();
});

const phoneController = require('./Controllers/Phone');
const phoneModel      = require('./Models/Phone');

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
  phoneController.getPhoneLength().then(length => {
    response.send(`<p>Phonebook has info for ${length} people</p><p>${new Date()}</p>`);
  });
});

app.get('/api/persons', (request, response) => {
  phoneController.getAllPhones().then((persons) => {
    console.log(persons);
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  phoneController.getPhoneById(request.params.id).then(person => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  console.log("id", request.params.id);
  phoneController.deletePhone(request.params.id).then(() => {
    console.log("asd");
    response.status(204).end();
  }).catch(err => {
    response.status(500);
    response.json(err);
  })
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
    else
    {
      let new_person = phoneModel({
        name: request.body.name,
        number: request.body.number,
      });
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
}).on("close", () => {
  db.turn_off();
});