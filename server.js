const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/queries')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)

app.get('/',(request,response) => {
  response.json({info:'API REST running with success!'})
})

app.get('/pessoa', routes.getPessoa)
app.get('/pessoa/:id', routes.getPessoaById)
app.post('/pessoa', routes.createPessoa)
app.put('/pessoa/:id', routes.updatePessoa)



app.listen(PORT, () => {
  console.log(`server is runing in http://localhost:${PORT}`)
})
