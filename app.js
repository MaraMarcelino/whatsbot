const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
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

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/webhook', (req, res) =>{
    execSQLQuery("INSERT INTO [dbo].[TESTE_WHATS] ([conteudo]) VALUES ('TESTE')", res);
});

app.post("/webhook", (req, res) => {
    console.log(req.body);
    execSQLQuery("INSERT INTO [dbo].[TESTE_WHATS] ([conteudo]) VALUES ('" + req.body + "')", res);
    return res.json({
      erro: false,
      mensagem: "Mensagem de teste!"
    });
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

