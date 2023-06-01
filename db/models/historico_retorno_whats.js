'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const sql = require(process.env.DB_DIALECT);

async function execSQLQuery(dados){
    try{
        let pool = await sql.connect(config);
        await pool.request().query("INSERT INTO [dbo].[HISTORICO_RETORNO_WHATS] ([teste]) VALUES ('"+dados+"')");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    execSQLQuery : execSQLQuery
}