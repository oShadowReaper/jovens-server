//const {response} = require('express');
const Pool = require('pg').Pool
require("dotenv").config()

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
const proConfig = process.env.DATABASE_URL;

 const db = new Pool({
    connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig
})


const getPessoa = (request, response) => {
  const { email, senha } = request.body
  db.query(
    'SELECT * FROM pessoa WHERE email = $1 ORDER BY nome_completo',
    [email],
        (error, results) => {
          if (error) {
            console.log("error" + error);
            response.status(400).send({
              status: 400,
              message: "error ao procurar o usuário" + error,
            });
            } else {
            if(results.rows.length === 0) {
              response.status(400).send("Usuário não encontrado");
              } else {
              if (results.rows[0].senha === senha) {
                response.status(200).json(results.rows);
                console.log(request.body);
                } else {
                response.status(400).send('Senha incorreta')
                }
              }
            }
          }
        )
      };
const getPessoaById = (request, response) => {
  const idpessoa = parseInt(request.params.idpessoa)

  db.query('SELECT * FROM pessoa WHERE idpessoa = $1', [idpessoa],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createPessoa = (request, response) => {
  const{nome_completo, cpf, telefone, data_nascimento, email, senha} = request.body
  console.log(request.body)
    db.query('INSERT INTO pessoa(nome_completo, cpf, telefone, data_nascimento, email, senha)VALUES($1, $2, $3, $4, $5, $6)',
      [nome_completo, cpf, telefone, data_nascimento, email, senha], (error, results) => {
    if (error){
      throw error
    }else{
      response.status(201).send('Cadastro concluido')
    }
  })
}
const updatePessoa = (request, response) => {
  const idpessoa = parseInt(request.params.idpessoa)
  const {nome_completo, idade, cidade} = request.body

  db.query('UPDATE pessoa set nome_completo = $1, idade = $2, cidade = $3 where idpessoa = $4',
  [nome_completo, idade, cidade, idpessoa], (error, results) => {
    if(error) {
      throw error
    }
    response.status(201).send('perfil atualizado')
  })
}

const getEmpresa = (request, response) => {
  db.query('SELECT * FROM empresa ORDER BY nome_empresa ASC',
        (error, results) =>{
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
  
}
const getEmpresaById = (request, response) => {
  const idempresa = parseInt(request.params.idempresa)

  db.query('SELECT * FROM empresa WHERE idempresa = $1', [idempresa],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createEmpresa = (request, response) => {
  const {nome_empresa, cnpj, telefone, data_fundacao, email, senha} = request.body

    db.query('INSERT INTO empresa(nome_empresa, cnpj, telefone, data_fundacao, email, senha)VALUES($1, $2, $3, $4, $5, $6)',
      [nome_empresa, cnpj, telefone, data_fundacao, email, senha], (error, results) => {
    if (error){
      throw error
    }else{
      response.status(201).send('Cadastro concluido')

    }
    response.status(201).send('Cadastro concluido')
  })
}
const updateEmpresa = (request, response) => {  
  const idempresa = parseInt(request.params.idempresa)
  const {nome_empresa, idade, cidade} = request.body

  db.query('UPDATE empresa set nome_empresa = $1, idade = $2, cidade = $3 where idempresa = $4',
  [nome_empresa, idade, cidade, idempresa], (error, results) => {
    if(error) {
      throw error
    }
    response.status(201).send('perfil atualizado')
  })
}
const getPostagem = (request, response) => {
  db.query('SELECT * FROM postagem ORDER BY idpostagem DESC',
        (error, results) =>{
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
  
}
const getPostagemById = (request, response) => {
  const idpostagem = parseInt(request.params.idpostagem)

  db.query('SELECT * FROM postagem WHERE idpostagem = $1', [idpostagem],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createPostagem = (request, response) => {
  const {foto, data_postagem, titulo, descricao, idpessoa} = request.body

    db.query('INSERT INTO postagem(foto, data_postagem, titulo, descricao, idpessoa)VALUES($1, $2, $3, $4, $5)',
      [foto, data_postagem, titulo, descricao, idpessoa ], (error, results) => {
    if (error){
      throw error
    }else{
      response.status(201).send('Post concluido')

    }
    
  })
}
const updatePostagem = (request, response) => {
  const idpostagem = parseInt(request.params.idpostagem)
  const {foto,data_postagem, titulo, descricao} = request.body

  db.query('UPDATE postagem set foto = $1,  data_postagem = $2, titulo = $3 descricao idpostagem = $4',
  [foto, data_postagem, titulo, descricao, idpostagem], (error, results) => {
    if(error) {
      throw error
    }
    response.status(201).send('post atualizado')
  })
}

const deletePostagem = (request, response) => {
  const idpostagem = parseInt(request.params.idpostagem)

  db.query('DELETE FROM postagem WHERE idpostagem = $1', [idpostagem],
      (error, results) => {
        if(error){
          throw error
        }
        response.status(201).send('Postagem excluida')
      })
    }



module.exports = {
  getPessoa,
  getPessoaById,
  createPessoa,
  updatePessoa,
  getEmpresa,
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  getPostagem,
  getPostagemById,
  createPostagem,
  updatePostagem,
  deletePostagem
}
