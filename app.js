const express = require('express');
const app = express();
const json_encode = require('json_encode');
const sql = require('mssql');
const connStr =  {
    server: '172.18.0.221',
    database: 'NetClinicanetOld',
    user: 'db_user_netclinicah',
    password: 'net#@!cmpz',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      trustServerCertificate: true,
      encrypt: false,
    },
  };

  function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}

sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));
   
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

  console.log(encoded);

  execSQLQuery("INSERT INTO [dbo].[HISTORICO_RETORNO_WHATS] ([teste]) VALUES ('"+encoded+"')", res);

  return res.json({
    erro: false,
    mensagem: "Sucesso!"
});

});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado");
});