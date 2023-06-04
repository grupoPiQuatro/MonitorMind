var database = require("../database/config")

function listarReinicio(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarReinicio()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `

    select c.hostname, 
    c.status, 
    l.setor,
    CONVERT(TIME, CONVERT(VARCHAR(8), h.dtCaptura, 108)) AS 'hora',
    h.id as idReinciar
    from historicoReiniciar as h 
    join Computador as c on h.fkComputador = c.hostname
        join Localizacao as l on c.fkLocalizacao = l.idLocalizacao
        where h.tempoReiniciar >= 5 and c.fkEmpresa = ${fkEmpresa} and c.status IN ('Operando', 'Manutenção', 'Interrompido') and cast(dtCaptura as date) = CAST(DATEADD(HOUR, -3, GETDATE()) as DATE);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adiarReinicio(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adiarReinicio()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `
        DECLARE @tempoReiniciar INT;

        SELECT @tempoReiniciar = tempoReiniciar
        FROM historicoReiniciar
        WHERE id = ${id};

        update historicoReiniciar set tempoReiniciar = @tempoReiniciar + 10 where id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarReinicio(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adiarReinicio()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `
        update historicoReiniciar set tempoReiniciar = 0 where id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarReinicio(hostname) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adiarReinicio()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `


        insert into [dbo].[historicoReiniciar](tempoReiniciar, dtCaptura, fkComputador) values(5, DATEADD(HOUR, -3, GETDATE()), '${hostname}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarReinicio,
    adiarReinicio,
    deletarReinicio,
    adicionarReinicio
}