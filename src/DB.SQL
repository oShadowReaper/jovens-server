create table pessoa (
  idpessoa serial primary key,
  nome_completo varchar(150),
  cidade varchar(100),
  cpf char(11),
  telefone char(11),
  data_nascimento date,
  email varchar(100),
  senha varchar(50),
  idade int
  
);
create table empresa(
  idempresa serial primary key,
  nome_empresa varchar(100),
  email varchar(100),
  senha varchar(100),
  telefone char(11),
  idade int,
  cidade varchar(100),
  data_fundacao date,
  cnpj char(14)
);
create table postagem (
 idpostagem serial primary key,
 foto varchar(200),
 data_postagem date,
 titulo varchar(100),
 descricao varchar(300),
 idpessoa int,
 foreign key(idpessoa) references pessoa(idpessoa)
);