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
constraint ctTipo check (tipo in ('Owner', 'Admin', 'Normal')),
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

create table Computador (
serialComputador varchar(15) primary key,
sistemaOperacional varchar(45),
nomeCpu varchar(45),
nucleoFisico int,
nucleoLogico int,
qtdRam long,
qtdArmazenamento long,
tipoDisco varchar(3),
status varchar(15),
constraint ctStatus check (status in ('Operando', 'Manutenção', 'Interrompido')),
fkEmpresa int,
constraint ctFkEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
);

drop database monitormind;

select * from Empresa;
select * from Endereco;
select * from Usuario;
select * from Computador;

truncate empresa;
truncate endereco;
truncate usuario;
truncate computador;

INSERT INTO Usuario (nomeUsuario, email, senha, tipo, fkEmpresa) VALUES ('Nathan David','123', '123', 'Owner', 1);
INSERT INTO Empresa (nomeEmpresa, cnpj, telefone) values ('Contax', '12345678901234', '1187878787');
INSERT INTO Endereco (cep, numero, fkEmpresa) VALUES ('05163020', '8', 1);