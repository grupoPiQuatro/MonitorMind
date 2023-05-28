var database = require("../database/config")

function listarMaquinas(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    //Precisa de um select com join para receber os computadores
    var instrucao = `
    select c.hostname, 
	c.status, 
    l.setor,
	t.nome 'tipo'
    from Computador as c
		join config on c.hostname = config.fkComputador
			join Componente on config.fkComponente = Componente.idComponente
				join tipoComponente as t on t.idTipoComponente = Componente.fkTipo
					join Localizacao as l on l.idLocalizacao = c.fkLocalizacao
						where t.idTipoComponente = 4 or t.idTipoComponente = 5 and c.fkEmpresa = 1 and c.fkEmpresa = ${fkEmpresa};
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

function deletarMaquina(){
    // Computador > historicoReiniciar > config > metrica > alertaHistorico > parametros
}

module.exports = {
    listarMaquinas,
    cadastrarMaquina,
    listarComponentes,
};