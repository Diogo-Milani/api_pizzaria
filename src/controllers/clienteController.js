import * as clienteService from '../services/clienteServices.js'
import Joi from 'joi'


export const clienteCreateSchema = Joi.object({
cpf: Joi.string().length(11).required(),
nome: Joi.string().required().max(100),
email: Joi.string().required().email().max(30),
telefone: Joi.string().required().length(11),
endereco: Joi.string().required().max(100),
bairro: Joi.string().max(30),
cidade: Joi.string().max(30),
cep: Joi.string().length(8),
senha: Joi.string().required().length(255)
})

export const clienteUpdateSchema = Joi.object({
nome: Joi.string().max(100),
email: Joi.string().email().max(30),
telefone: Joi.string().length(11),
endereco: Joi.string().max(100),
bairro: Joi.string().max(30),
cidade: Joi.string().max(30),
cep: Joi.string().length(8),
senha:Joi.string().length(255)
}).min(1);

export const listarClientes = async (req, res) => {
try {
    const clientes = await clienteService.findAll()
    res.status(200).json(clientes)
} catch (err) {
    console.error('Erro ao buscar clientes', err)
    res.status(500).json({error: 'Erro interno do servidor'})
}
}

export const listarClientesCpf = async (req, res) => {
    try {
        
        const {cpf} = req.params;
        const cliente = await clienteService.findByCpf(cpf)
        if (!cliente) {
            
            return res.status(404).json({error: 'Cliente não encontrado'})
        }
        res.status(200).json(cliente)
    } catch (err) {
        console.error('Erro ao buscar cliente', err)
        res.status(500).json ({error: 'Erro interno do servidor'})
    }
}


export const adicionarCliente = async (req, res) => {
    try {
        const novoCliente = await clienteService.create(req.body)
        res.status(201).json({message: 'Cliente adicionado com sucesso', data: novoCliente})
    } catch (err) {
        console.error ('Error ao adicionar cliente', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status (409).json ({ error: 'CPF já cadastrado.'})
        }
        res.status(500).json({error: 'Erro ao adicionar cliente'})
    }
}

export const atualizarCliente = async (req,res) => {
    try {
        const {cpf} = req.params
        const updated = await clienteService.update(cpf, req.body)
        if (!updated) {
            return res.status(404).json({error: 'Cliente não encontrado'})
        }
        res.status(200).json ({message: 'Cliente atualizado com sucesso'})
    } catch (err) {
        console.error('Erro ao atualizar cliente',err)
        res.status(500).json({error: 'Erro ao atualizar cliente'})
    }
}

export const deletarCliente = async (req,res) => {
    try {
        const {cpf} = req.params
        const deleted = await clienteService.remove(cpf)
        if (!deleted) {
            return res.status(404).json({error: 'Cliente não encontrado'})
        }
        res.status(200).json({message: 'Cliente deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletar cleinte',err)
        res.status(500).json({error: 'Erro ao deletar cliente'})
    }
}

 