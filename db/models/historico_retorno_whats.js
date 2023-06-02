'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const sql = require(process.env.DB_DIALECT);

async function execSQLQuery(dados){
    try{
        let pool = await sql.connect(config);
        await pool.request().query("SELECT * FROM HISTORICO_ENVIO_WHATS WHERE ");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    execSQLQuery : execSQLQuery
}