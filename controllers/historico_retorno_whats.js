const express = require("express");
const router = express.Router();
const historico_retorno_whats = require('./../db/models/historico_retorno_whats');
const json_encode = require('json_encode');
const path = require("path");

router.get("/", async (req, res) => {
    var caminho = __dirname.replace(path.basename(__dirname), '');
    res.sendFile(path.join(caminho + "/views/home.html"))
});

router.get("/webhook", async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Mara Sucesso!"
    });
});

router.post("/webhook", async (req, res) => {
    var dados = req.body;

    console.log(dados.entry[0].changes[0].value.statuses);
    //console.log(json_encode(req.body));
   /* historico_retorno_whats.execSQLQuery(dados.entry[0].changes[0].value.statuses).then(result => {
    
})*/

    return res.json({
        erro: false,
        mensagem: "Sucesso!"
    });
});

module.exports = router;

//tokenbotwhatsnetclinica