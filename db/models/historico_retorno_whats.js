'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const sql = require(process.env.DB_DIALECT);

async function execSQLQueryAtualizaStatus(status,recipient_id){
    try{
        var campo;

        if(status == "delivered"){
            campo = "datahora_recebido";
        }
        else if(status == "read"){
            campo = "datahora_lido";
        }

        let pool = await sql.connect(config);
        await pool.request().query("UPDATE HISTORICO_ENVIO_WHATS " +
                                   "SET " + campo + " = GETDATE() " +
                                   "WHERE celular_enviado = '" + recipient_id + "' AND CONVERT(VARCHAR(10), datahora_envio, 103) = CONVERT(VARCHAR(10), GETDATE(), 103)");
        
    }
    catch(error){
        console.log(error);
    }
}

async function execSQLQuery(dados){
    try{
        let pool = await sql.connect(config);
        await pool.request().query("SELECT * FROM HISTORICO_ENVIO_WHATS WHERE celular_enviado = '" + dados.recipient_id + "' AND CONVERT(VARCHAR(10), datahora_envio, 103) = CONVERT(VARCHAR(10), GETDATE(), 103)");

        Object.keys(result).forEach(function(key) {
            var row = result[key];
            console.log(row.name)
        });
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    execSQLQuery : execSQLQuery,
    execSQLQueryAtualizaStatus : execSQLQueryAtualizaStatus
}