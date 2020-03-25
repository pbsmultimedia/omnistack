const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// ongs
routes.get('/ongs', OngController.index );
routes.post('/ongs', OngController.create);

// login / session
routes.post('/session', SessionController.create);

// incidents
routes.get('/incidents', IncidentController.index );
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// profile / ongs incidents
routes.get('/profile', ProfileController.index );

// tell to node what is exported from this file
module.exports = routes;