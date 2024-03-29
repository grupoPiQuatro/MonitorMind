var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    var instrucao = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxar(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    SELECT COUNT(*) as total_linhas 
    from (SELECT
    hostname
    FROM [dbo].[computador] AS c
    JOIN [dbo].[config] AS cf ON cf.fkComputador = c.hostname
    JOIN [dbo].[metrica] AS m ON m.fkConfig = cf.idConfig
    join [dbo].[componente] ct on ct.idComponente = cf.fkComponente
    WHERE ct.fkTipo in (3,8,13)
    AND dtCaptura >= DATEADD(day, -30, GETDATE())
    AND c.fkEmpresa = ${fkEmpresa}
    group by hostname
    having avg(m.valor) > 80
    ) as subquery;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function comptotal(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    SELECT COUNT(*) as total from [dbo].[computador] c where c.fkEmpresa = ${fkEmpresa};
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function semRespostaPing(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    select 
    avg(valor) as mediaPing
    from [dbo].[computador] c	
    join [dbo].[config] cf on cf.fkComputador = c.hostname
    join [dbo].[metrica] m on m.fkConfig = cf.idconfig
    join [dbo].[componente] cp on cp.idComponente = cf.fkComponente
    join [dbo].[tipoComponente] t on t.idTipoComponente = cp.fkTipo
    where t.nome = 'rede';
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function reinicioMaiorQueUm(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
        select count(*) as qtdReinicio from (
        select fkComputador,count(id) as count from [dbo].[historicoReiniciar] h 
        where h.dtCaptura >= DATEADD(day, -7, GETDATE())
        and tempoReiniciar = 0
        group by fkComputador
        having count(id) > 2) as subquery;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function riscoPreenchimento(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    select count(*) as qtdComputadores 
    from (select  
    cf.fkComputador,
    m.valor,
    m.unidade,
    t.nome,
    max(m.dtCaptura) as comp
    from [dbo].[metrica] m
    join [dbo].[config] cf on cf.idConfig = m.fkConfig
    join [dbo].[componente] cp on cp.idComponente = cf.fkComponente
    join [dbo].[tipoComponente] t on t.idTipoComponente = cp.fkTipo
    where (t.nome like 'ssd' or t.nome like 'hd')
    and valor > 95
    group by cf.fkComputador, m.valor, m.unidade, t.nome) as subquery;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alertaPorComponente(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    select 
    Nome,
    count(fkAlerta) as qtdAlerta
    from [dbo].[historicoAlerta] ha 
    join [dbo].[metrica] m on m.idMetrica = ha.fkMetrica
    join [dbo].[config] cf on cf.idConfig = m.fkConfig
    join [dbo].[componente] cp on cp.idComponente = cf.fkComponente
    join [dbo].[tipoComponente] tc on tc.idTipoComponente = cp.fkTipo
    where fkAlerta = 2
    group by nome;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function percentPcReinicio(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    select 
FORMAT(dtCaptura, 'yyyy-MM-dd') as data,
count(id) as conta
from [dbo].[historicoReiniciar] h 
where h.dtCaptura >= DATEADD(day, -7, GETDATE())
and tempoReiniciar = 0
group by FORMAT(dtCaptura, 'yyyy-MM-dd');
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function tempoStatus(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucao = `
    SELECT COUNT(*) as total from [dbo].[computador] c where c.fkEmpresa = ${fkEmpresa} and hostname = 'AA';
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    puxar,
    comptotal,
    semRespostaPing,
    reinicioMaiorQueUm,
    riscoPreenchimento,
    alertaPorComponente,
    percentPcReinicio,
    tempoStatus
}
