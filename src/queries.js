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

module.exports = {
  getPessoa,
  getPessoaById,
  createPessoa,
  updatePessoa
}