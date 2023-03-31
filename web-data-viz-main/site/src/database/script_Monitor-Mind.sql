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

drop database monitormind;

select * from Empresa;
select * from Endereco;
select * from Usuario;

truncate empresa;
truncate endereco;
truncate usuario;

INSERT INTO Usuario (nomeUsuario, email, senha, tipo, fkEmpresa) VALUES ('Nathan David','123', '123', 'admin', 1);
INSERT INTO Empresa (nomeEmpresa, cnpj, telefone) values ('Empresa boa', );
INSERT INTO Endereco (cep, numero, fkEmpresa) VALUES ('05163020', '8', 1);