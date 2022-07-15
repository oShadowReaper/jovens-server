const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT =  5432
const routes = require('./src/queries')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)

app.get('/',(request,response) => {
  response.json({info:'API REST running with success!'})
})

app.listen(PORT, () => {
  console.log(`server is runing in https://jovens-db.herokuapp.com`)
})

app.get('/pessoa', routes.getPessoa)
app.get('/pessoa/:idpessoa', routes.getPessoaById)
app.post('/pessoa', routes.createPessoa)
app.put('/pessoa/:idpessoa', routes.updatePessoa)
app.get('/empresa', routes.getEmpresa)
app.get('/empresa/:idempresa', routes.getEmpresaById)
app.post('/empresa', routes.createEmpresa)
app.put('/empresa/:idempresa', routes.updateEmpresa)
app.get('/postagem', routes.getPostagem)
app.get('/postagem/:idpostagem', routes.getPostagemById)
app.post('/postagem/', routes.createPostagem)
app.put('/postagem/:idpostagem', routes.updatePostagem)
app.delete('/postagem/:idpostagem', routes.deletePostagem)