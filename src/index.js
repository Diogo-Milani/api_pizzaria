import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url' // necessario para recriar o '_dirname'.
import authRoutes from './routes/authRoutes.js'
import produtoRoutes from '../src/routes/produtoRoutes.js'
import clienteRoutes from './routes/clienteRoutes.js'

// a chamada do banco
import db from './db/db.js' // excluir depois, não sera aqui a chamada do banco
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
app.use(`${apiPrefix}/clientes`, clienteRoutes); // ex: /api/clientes/
app.use(`${apiPrefix}/login`, authRoutes); // Rota de login ex:/api/login
app.use(`${apiPrefix}/produtos`, produtoRoutes);

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

