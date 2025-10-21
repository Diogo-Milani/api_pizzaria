import express, { response } from 'express'

const app = express()
app .use(express.json())

const PORTA  = 3333

app.listen(PORTA), () => {
    console.log(`Servidor rodando na porta ${PORTA}. Acesse https;//localhost:${PORTA}`)
}

app.get ('/', (request, response) => {
    response.json({message: "Bem-vindo a API da Pizzaria Senac!"})
})

const listaDeClientes = [
    {id: 1, nome: 'Diogo Milani', email: 'diogootaviomilani@outlook.com'},
    {id: 2, nome: 'Maria Santos', email: 'maria.santos@example.com'},
    {id: 3, nome: 'Luiz Carlos', email: 'luiz.carlos@example.omc.br'}
]

app.get('/clientes', (req, res) => {
    res.json(listaDeClientes)
})

app.get('/clientes/:id', (req, res) => {
    const idDoCliente = parseInt(req.params.id)
    const cliente = listaDeClientes.find (c => c.id === idDoCliente)
    if (cliente) {
        res.json(cliente)
    } else {
        res.status(404).json ({mensagem: 'Cliente não encontrado'})
    }
})

app.post('/clientes', (req,res) => {
    const novoCliente = req.body

    console.log('Recebemos um novo cliente', novoCliente)

    res.json({message: `Cliente ${novoCliente.nome} cadastrado com sucesso!`, data: novoCliente})
})