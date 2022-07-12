const { response } = require('express');

const Pool = require('pg').Pool
require("dotenv").config()

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}&sslmode=require`
const proConfig = process.env.DATABASE_URL;

const db = new Pool({
    connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig
})


const getPessoa = (request, response) => {
  db.query('SELECT * FROM pessoa ORDER BY nome_completo ASC',
        (error, results) =>{
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
  
}
const getPessoaById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM pessoa WHERE id = $1', [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createPessoa = (request, response) => {
  const {nome_completo, cpf, telefone, data_nascimento, email, senha} = request.body

    db.query('INSERT INTO pessoa(nome_completo, cpf, telefone, data_nascimento, email, senha)VALUES($1, $2, $3, $4, $5, $6)',
      [nome_completo, cpf, telefone, data_nascimento, email, senha], (error, results) => {
    if (error){
      throw error
    }else{
      response.status(201).send('Cadastro concluido')

    }
    response.status(201).send('Cadastro concluido')
  })
}
const updatePessoa = (request, response) => {
  const id = parseInt(request.params.id)
  const {nome_completo, idade, cidade} = request.body

  db.query('UPDATE pessoa set nome_completo = $1, idade = $2, cidade = $3 where id = $4',
  [nome_completo, idade, cidade, id], (error, results) => {
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
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM empresa WHERE id = $1', [id],
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
  const id = parseInt(request.params.id)
  const {nome_empresa, idade, cidade} = request.body

  db.query('UPDATE empresa set nome_empresa = $1, idade = $2, cidade = $3 where id = $4',
  [nome_empresa, idade, cidade, id], (error, results) => {
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
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM postagem WHERE id = $1', [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createPostagem = (request, response) => {
  const {foto, data_postagem, titulo, descricao} = request.body

    db.query('INSERT INTO postagem(foto, data_postagem, titulo, descricao)VALUES($1, $2, $3, $4)',
      [foto, data_postagem, titulo, descricao ], (error, results) => {
    if (error){
      throw error
    }else{
      response.status(201).send('Post concluido')

    }
    response.status(201).send('Post concluido')
  })
}
const updatePostagem = (request, response) => {
  const id = parseInt(request.params.id)
  const {foto,data_postagem, titulo, descricao} = request.body

  db.query('UPDATE postagem set foto = $1,  data_postagem = $2, titulo = $3 descricao id = $4',
  [foto, data_postagem, titulo, descricao], (error, results) => {
    if(error) {
      throw error
    }
    response.status(201).send('post atualizado')
  })
}

const deletePostagem = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM postagem WHERE id = $1', [id],
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