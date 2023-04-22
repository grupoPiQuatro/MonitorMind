create database MonitorMind;
use MonitorMind;

create table Empresa (
idEmpresa int primary key auto_increment,
nomeEmpresa varchar(45),
cnpj char(14),
telefone char(10)
);

create table Usuario (
idUsuario int auto_increment,
nomeUsuario varchar (45),
email varchar (45),
senha varchar (45),
tipo varchar(6),
constraint ctTipo check (tipo in ('Admin', 'Normal')),
fkEmpresa int, 
constraint ctFkEmpresaUser foreign key (fkEmpresa) references Empresa (idEmpresa),
primary key (idUsuario, fkEmpresa)
);

create table Endereco (
idEndereco int auto_increment,
cep char(8),
numero varchar(7),
fkEmpresa int,
constraint ctFkEmpresaEnd foreign key (fkEmpresa) references Empresa (idEmpresa),
primary key (idEndereco, fkEmpresa)
); 

create table Localizacao (
idLocalizacao int primary key auto_increment,
setor varchar(45),
andar varchar(45)
);

create table Componente (
idComponente int primary key auto_increment,
tipo varchar(45),
numeroChave double,
unidadeMedida varchar(45)
);

create table Computador (
serialComputador varchar(15) primary key,
sistemaOperacional varchar(45),
status varchar(15),
constraint ctStatus check (status in ('Operando', 'Manutenção', 'Interrompido')),
fkLocalizacao int,
constraint ctFkLocalizacao foreign key (fkLocalizacao) references Localizacao (idLocalizacao),
fkEmpresa int,
constraint ctFkEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
);

select * from Empresa;
select * from Endereco;
select * from Usuario where email = '123' and senha = '123';
select * from Computador;
select * from Componente;
select * from Localizacao;

truncate empresa;
truncate endereco;
truncate usuario;
truncate computador;
truncate componente;
truncate Localizacao;

drop table computador;
drop table localizacao;

INSERT INTO Usuario (nomeUsuario, email, senha, tipo, fkEmpresa) VALUES ('Nathan David','123', '123', 'Owner', 1);
INSERT INTO Empresa (nomeEmpresa, cnpj, telefone) values ('Contax', '12345678901234', '1187878787');
INSERT INTO Endereco (cep, numero, fkEmpresa) VALUES ('05163020', '8', 1);
INSERT INTO Componente (tipo, numeroChave, unidadeMedida) values ('rede', null, 'ms');