const express = require('express');
const app = express();

const morgan = require('morgan');

const db               = require('./db');
db.setup_db();

process.on('exit', () => {
    db.turn_off();
});

const phoneController  = require('./Controllers/Phone');
const phoneModel       = require('./Models/Phone');

const controllerErrors = require('./error');

app.use(express.static('public'));
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    // console.log(req.body);
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms ',
        `${JSON.stringify(req.body)}`,
    ];
}));

app.get('/info', (request, response, next) => {
    phoneController.getPhoneLength().then(length => {
        response.send(`<p>Phonebook has info for ${length} people</p><p>${new Date()}</p>`);
    }).catch(err => next(err));
});

app.get('/api/persons', (request, response, next) => {
    phoneController.getAllPhones().then((persons) => {
        response.json(persons);
    }).catch(err => next(err));
});

app.get('/api/persons/:id', (request, response, next) => {
    phoneController.getPhoneById(request.params.id).then(person => {
        response.json(person);
    }).catch(err => next(err));
});

app.delete('/api/persons/:id', (request, response, next) => {
    phoneController.deletePhone(request.params.id).then(() => {
        response.status(204).end();
    }).catch(err => next(err));
});

app.post('/api/persons/', (request, response, next) => {
    let new_person = phoneModel({
        name: request.body.name,
        number: request.body.number,
    });
    phoneController.createPhone(new_person).then(() => {
        response.status(200);
        response.json(new_person);
        response.end();
    }).catch(err => next(err));
});

app.put('/api/persons/:id', (request, response, next) => {
    let updated_person = {
        name: request.body.name,
        number: request.body.number,
    };
    phoneController.updatePhone(request.params.id, updated_person).then(phone => {
        response.status(200);
        response.json(phone);
        response.end();
    }).catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
    console.log(`[!] Err: ${error.name}`);

    if (error instanceof controllerErrors.DatabaseInternalError)
        return response.status(400).send({ error: error.error });
    else if(error.name === 'ValidationError')
        return response.status(400).json({ error: error.message });

    next(error);
};

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('close', () => {
    db.turn_off();
});