const { request, response } = require('express')

const Pool = require('pg').Pool
const db = new Pool({
    host: 'ec2-3-217-14-181.compute-1.amazonaws.com',
    database: 'dbfhkcoig67ihb',
    user: 'qhkfruvlmqqdar',
    password: 'baf69da30fd16b5334becae304f437465d3fee1cf39b558d932bc8eb5bc8add2',
    port: '5432'
})
const getPessoa = (request, response) => {
  db.query('SELECT * FROM pessoa ORDER BY nome_completo ASC',
        (error, results) =>{
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        }
  )
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