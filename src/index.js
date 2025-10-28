import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url' // necessario para recriar o '_dirname'.

// a chamada do banco
import db from './db/db.js' // excluir depois, não sera aqui a chamada do banco


import clienteRoutes from './routes/clienteRoutes.js'

//padrão moderno para obter o dirname
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const corsOptions = {
    origin: ['http://localhost:3333'
, 'https://meudominio.com'],
methods: 'GET, POST, PUT ,PATCH,DELETE',
Credentials: true,
}

const app = express() // inicializa o app

app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(_dirname, '..', 'public')))
// servindo a pasta 'public' para arquivos estáticos (css,js imagens,)

// rota principal que serve a pagina HTML.
app.get ('/', (req,res) => {
    res.sendFile(path.join(_dirname, '..', 'pages', 'home.html'))
})

//Rotas da API prefixadas para melhor organização e visionamento.

//Isso evita conflitos e deixa claro quais rotas pertencem á API.

const apiPrefix = '/api'
//app.use (`${apiPrefix}/`, routes)
app.use(`${apiPrefix}/clientes`, clienteRoutes) // ex: /api/clientes/

// -- TRATAMENTO DE ERROS --
app.use ((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado no servidor')
})

// -- INICIALIZAÇÃO DO SERVIDOR ---

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log (`Servidor rodando na porta ${PORT}`)
})



// const listaDeClientes = [
//     {id: 1, nome: 'Diogo Milani', email: 'diogootaviomilani@outlook.com'},
//     {id: 2, nome: 'Maria Santos', email: 'maria.santos@example.com'},
//     {id: 3, nome: 'Luiz Carlos', email: 'luiz.carlos@example.omc.br'}
// ]

// app.get('/clientes', (req, res) => {
//     res.json(listaDeClientes)
// })

// app.get('/clientes/:id', (req, res) => {
//     const idDoCliente = parseInt(req.params.id)
//     const cliente = listaDeClientes.find (c => c.id === idDoCliente)
//     if (cliente) {
//         res.json(cliente)
//     } else {
//         res.status(404).json ({mensagem: 'Cliente não encontrado'})
//     }
// })

// app.post('/clientes', (req,res) => {
//     const novoCliente = req.body

//     console.log('Recebemos um novo cliente', novoCliente)

//     res.json({message: `Cliente ${novoCliente.nome} cadastrado com sucesso!`, data: novoCliente})
// })