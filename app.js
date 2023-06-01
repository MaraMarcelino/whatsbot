const express = require("express");
const app = express();

app.use(express.json());

const historico_retorno_whats = require("./controllers/historico_retorno_whats");

app.use('/', historico_retorno_whats);

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado");
});