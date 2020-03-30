const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

//adicionando cors para segurança da aplicação
//ao colocar em produção incluir as origin para dfinir quais urls poderam acessar o backend
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);