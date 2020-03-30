const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

//ROTAS DA SESSION
routes.post('/session', sessionController.create);

//ROTAS ONGS
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

//ROTAS INCIDENTS
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

//ROTAS PROFILE - INCIDENTES DE UMA MESMA ONG
routes.get('/profile', profileController.index);

module.exports = routes;