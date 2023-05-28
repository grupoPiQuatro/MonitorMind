CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY IDENTITY,
nome VARCHAR(45),
cnpj VARCHAR(45),
telefone VARCHAR(10)
);

create table cargo (
idCargo int primary key IDENTITY,
nivel int
); 

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY IDENTITY,
cep VARCHAR(45),
numero VARCHAR(45),
fkEmpresa int,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY IDENTITY,
nome VARCHAR(45),
email VARCHAR(60),
senha VARCHAR(45),
tipo VARCHAR(5),
fkEmpresa int,
foreign key (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE localizacao (
idLocalizacao INT PRIMARY KEY IDENTITY,
setor VARCHAR(45),
andar VARCHAR(45)
);

CREATE TABLE tipoComponente (
idTipoComponente INT PRIMARY KEY IDENTITY,
nome VARCHAR(45)
);

CREATE TABLE computador (
serialComputador VARCHAR(45) PRIMARY KEY,
sistemaOperacional VARCHAR(45),
status VARCHAR(15),
fkEmpresa INT,
fkLocalizacao INT,
foreign key (fkEmpresa) REFERENCES empresa(idEmpresa),
foreign key (fkLocalizacao) REFERENCES localizacao(idLocalizacao)
);

CREATE TABLE historicoReiniciar (
idReiniciar INT PRIMARY KEY IDENTITY,
tempoReiniciar INT,
dtCaptura VARCHAR(45),
fkComputador VARCHAR(45),
foreign key (fkComputador) REFERENCES computador(serialComputador)
);

CREATE TABLE componente (
idComponente INT PRIMARY KEY IDENTITY,
tipo VARCHAR(45),
numeroChave float,
unidadeMedida VARCHAR(45)
foreign key (fkTipo) REFERENCES tipoComponente (idTipoComponente)
);

CREATE TABLE config (
idConfig INT PRIMARY KEY IDENTITY,
fkComputador VARCHAR(45),
fkComponente INT,
foreign key (fkComputador) REFERENCES computador(serialComputador),
foreign key (fkComponente) REFERENCES componente(idComponente)
);

create table metrica(
idMetrica int primary key IDENTITY,
valor float,
unidade varchar(45),
dtCaptura datetime,
fkConfig int,
foreign key (fkConfig) references Config(idConfig)
);

CREATE TABLE alerta (
idAlerta INT PRIMARY KEY IDENTITY,
tipoAlerta VARCHAR(45)
);

CREATE TABLE alertaHistorico (
idAlertaHistorico INT PRIMARY KEY IDENTITY,
fkMetrica INT,
fkAlerta INT,
dtCaptura datetime,
foreign key (fkMetrica) REFERENCES metrica(idMetrica),
foreign key (fkAlerta) REFERENCES alerta(idAlerta)
);

CREATE TABLE parametros (
idParametro INT PRIMARY KEY IDENTITY,
fkEmpresa INT,
fkComponente INT,
fkAlerta INT,
valor float,
foreign key (fkEmpresa) REFERENCES empresa(idEmpresa),
foreign key (fkComponente) REFERENCES componente(idComponente),
foreign key (fkAlerta) REFERENCES alerta(idAlerta)
);