const express = require('express');
const app = express();
const json_encode = require('json_encode');

app.use(express.json());
 
app.get("/", function (_req, res) {
  res.render("index");
});


app.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
});

app.post("/webhook", (req, res) => {
  let body = req.body;
  var encoded = json_encode(body);

  return res.json({
    erro: false,
    mensagem: "Sucesso!"
});

});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado");
});