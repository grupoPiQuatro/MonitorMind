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
                ROW_NUMBER() OVER (PARTITION BY c.hostname, cfg.fkComponente ORDER BY m.dtCaptura DESC) AS rn
            FROM computador AS c
            JOIN localizacao AS l ON c.fkLocalizacao = l.idLocalizacao
            JOIN config AS cfg ON c.hostname = cfg.fkComputador
            JOIN componente AS comp ON cfg.fkComponente = comp.idComponente
            JOIN metrica AS m ON m.fkConfig = cfg.idConfig
            WHERE c.fkEmpresa = ${fkEmpresa}
        ) AS subquery
        WHERE rn = 1
        ORDER BY subquery.hostname;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarParametro(fkEmpresa) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarParametro()");
    var instrucao = `
        select idParametro, valor from parametros where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarStatus(fkEmpresa) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarStatus()");
    var instrucao = `
        select hostname, status from computador where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPcSemRetorno(fkEmpresa) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPcSemRetorno");
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

function dadosRede(hostname) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosRede()");
    var instrucao = `
        SELECT valor, FORMAT(dtCaptura, 'HH:mm:ss') as momento FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND fkComponente = 1 
	    AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarComp(hostname) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosRede()");
    var instrucao = `
        SELECT * from computador join config on hostname = fkComputador join localizacao on fkLocalizacao = idLocalizacao join componente on fkComponente = idComponente where fkComputador = '${hostname}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosRam(hostname, idRam) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosRam()");
    var instrucao = `
        SELECT valor, FORMAT(dtCaptura, 'HH:mm:ss') as momento FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND idConfig = ${idRam}
	    AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosCpu(hostname, idCpu) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosCpu()");
    var instrucao = `
        SELECT valor, FORMAT(dtCaptura, 'HH:mm:ss') as momento FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND idConfig = ${idCpu}
	    AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosDisco(hostname, idDisco) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosDisco()");
    var instrucao = `
        SELECT TOP 1 valor FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND idConfig = ${idDisco}
	    AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarRede(hostname) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarRede()");
    var instrucao = `
        SELECT TOP 1 valor, FORMAT(dtCaptura, 'HH:mm:ss') as momento FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND fkComponente = 1 
        AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarRam(hostname, idRam) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarRam()");
    var instrucao = `
        SELECT TOP 1 valor, FORMAT(dtCaptura, 'HH:mm:ss') as momento FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND idConfig = ${idRam}
        AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarCpu(hostname, idCpu) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarCpu()");
    var instrucao = `
        SELECT TOP 1 valor, FORMAT(dtCaptura, 'HH:mm:ss') as momento FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND idConfig = ${idCpu}
        AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarDisco(hostname, idDisco) {
    console.log("ACESSEI O PCMODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarDisco()");
    var instrucao = `
        SELECT TOP 1 valor FROM metrica JOIN config ON fkConfig = idConfig WHERE fkComputador = '${hostname}' AND idConfig = ${idDisco}
        AND dtCaptura >= DATEADD(DAY, -7, GETDATE()) ORDER BY dtCaptura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    buscarParametro,
    buscarStatus,
    buscarPcSemRetorno,
    dadosRede,
    pegarComp,
    dadosRam,
    dadosCpu,
    dadosDisco,
    atualizarRede,
    atualizarRam,
    atualizarCpu,
    atualizarDisco
};