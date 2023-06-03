var database = require("../database/config")

function listarMaquinas(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `
    select c.hostname, 
	c.status, 
    l.setor,
	t.nome 'tipo',
    Componente.numeroChave 'volume'
    from Computador as c
		join config on c.hostname = config.fkComputador
			join Componente on config.fkComponente = Componente.idComponente
				join tipoComponente as t on t.idTipoComponente = Componente.fkTipo
					join Localizacao as l on l.idLocalizacao = c.fkLocalizacao
						where t.idTipoComponente = 4 and c.fkEmpresa = ${fkEmpresa} and c.status IN ('Operando', 'Manutenção', 'Interrompido') or t.idTipoComponente = 5 and c.fkEmpresa = ${fkEmpresa} and c.status IN ('Operando', 'Manutenção', 'Interrompido');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarMaquina(setor, hostName, tipoArmazenamento, tamanhoRam, so, ghzProcessador) {
    
    var instrucao = `
        INSERT INTO Computador (nome, cnpj, telefone) VALUES ('${nomeEmpresa}', '${cnpj}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarComponentes() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarComponentes()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `
        SELECT * FROM Componente;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Deletar usuario

function deletarMaquina(hostname){
    // Computador > historicoReiniciar > config > metrica > alertaHistorico > parametros
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarMaquina()");

    var instrucao = `
        update Computador set status = 'Desativado' where hostname = '${hostname}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Editar Usuario

function encontrarSetor(setor){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function encontrarSetor()");

    var instrucao = `
        insert into [dbo].[localizacao](setor) values('${setor}');
        select top 1 * from [dbo].[localizacao] where setor = '${setor}' order by idLocalizacao desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function encontrarConfig(tipo, volume){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function encontrarConfig()");

    var instrucao = `
        select 
        c.idComponente
            from componente c
                join tipoComponente t
                    on fkTipo = idTipoComponente where t.nome = '${tipo}' and c.numeroChave = ${volume};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirConfig(tipo, volume){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirConfig()");

    var instrucao = `
        insert into Componente (numeroChave, unidadeMedida, fkTipo) values (${volume}, 'GB', ${tipo}); 
        select top 1 idComponente from componente order by idComponente desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarMaquina(hostname, setor, status, fkComponente){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarMaquina()");

    var instrucao = `
        update Computador set status = '${status}', fkLocalizacao = ${setor} where hostname = '${hostname}';
        update Config set fkComponente = ${fkComponente} from Config join componente on fkComponente = idComponente where fkComputador = '${hostname}' and fkTipo = 4 or fkTipo = 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarMaquinas,
    cadastrarMaquina,
    listarComponentes,
    deletarMaquina,
    encontrarSetor,
    encontrarConfig,
    inserirConfig,
    editarMaquina
};