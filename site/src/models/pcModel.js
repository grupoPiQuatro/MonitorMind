var database = require("../database/config")


// O SELECT ABAIXO RETORNA O ULTIMO REGISTRO DISPONIVEL REFERENTE A CADA COMPUTADOR
// Ex: Se haver 100 computadores no sistema, o select retornara o ultimo dados desses 100 computadores.
// Isso evita do sistema trazer dados repetidos
function listar(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT *
        FROM (
            SELECT *,
                ROW_NUMBER() OVER (PARTITION BY c.hostname ORDER BY m.dtCaptura DESC) AS rn
            FROM [dbo].[computador] AS c
            JOIN [dbo].[localizacao] AS l ON c.fkLocalizacao = l.idLocalizacao
            JOIN [dbo].[config] AS cfg ON c.hostname = cfg.fkComputador
            JOIN [dbo].[componente] AS comp ON cfg.fkComponente = comp.idComponente
            JOIN metrica AS m ON m.fkConfig = cfg.idConfig
            WHERE c.fkEmpresa = ${fkEmpresa}
        ) AS subquery
        WHERE rn IN (1, 2, 3, 4)
        ORDER BY subquery.dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarParametro(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        select idParametro, valor from parametros where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarStatus(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        select hostname, status from computador where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPcSemRetorno(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT count(hostname)
    FROM (
        SELECT *,
            ROW_NUMBER() OVER (PARTITION BY c.hostname ORDER BY c.hostname) AS rn
        FROM computador c
        LEFT JOIN config cfg ON c.hostname = cfg.fkComputador
        LEFT JOIN metrica m ON cfg.idConfig = m.fkConfig
        WHERE m.idMetrica IS NULL and c.fkEmpresa = ${fkEmpresa}
    ) AS subquery
    WHERE rn IN (1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    buscarParametro,
    buscarStatus,
    buscarPcSemRetorno
};