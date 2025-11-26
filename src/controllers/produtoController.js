import * as produtoService from '..//services/produtoService.js'
import Joi from 'joi';

export const produtoCreateSchema = Joi.object({
    idProduto: Joi.string().required().max(130),
    nome: Joi.string().max(40).required(),
    descricao: Joi.string().max(200).required(),
    tipo: Joi.string().max(20).required(),
    valor: Joi.string().required(),
    imagem: Joi.string().max(255).allow(''),
});

export const produtoUpdateSchema = Joi.object({
    idProduto: Joi.string().max(130),
    nome: Joi.string().max(40),
    descricao: Joi.string().max(200),
    tipo: Joi.string().max(20),
    valor: Joi.string(),
    imagem: Joi.string().max(255).allow(''),
}).min(1);

export const listarProdutos = async (req,res) => {
    try {
        // capturamos os parâmetro da consulta da URL
        // ex: ?minValor=10 / ?maxValor = 100 / ?nome=pizza / ?id=001
        const {minValor, maxValor, nome, idProduto} = req.query;
        const produtos = await produtoService.findAll(minValor, maxValor, nome, idProduto)
        if (produtos.length === 0) {
            return res.status(404).json({message: 'Nenhum produto encontrado com esses filtros.'});
        }
        res.status(200).json(produtos)
    } catch (err) {
        console.error('Erro ao buscar produto', err)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export const listarProdutosId = async (req,res) => {
    try {
        const {idProduto} = req.params
        const produto = await produtoService.findByIdProduto(idProduto)
        if(!produto) {
            return res.status(404).json({error: 'Erro ao buscar ID do produto'})
        }
        res.status(200).json(produto)
    } catch (err) {
        console.error('Error ao buscar ID' ,err)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export const atualizarProduto = async (req,res) => {
    try {
        const {idProduto} = req.params
        const updated = await produtoService.update(idProduto, req.body)
        if(!updated) {
            return res.status(404).json({error: 'produto não encontrado'})
        }
        res.status(200).json({message: 'produto atualizado com sucesso'})
    } catch (err) {
        console.error('Erro ao atualizar produto' ,err)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export const adicionarProduto = async (req,res) => {
    try {
        const novoProduto =  await produtoService.create(req.body)
        res.status(201).json({message: 'Cliente adicionado com sucesso', data: novoProduto})
    } catch (err) {
        console.error('Erro ao adicionar produto' ,err)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status (409).json ({error: 'Produto ja cadastrado'})
        }
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

export const deletarProduto = async (req,res) => {
    try {
        const {idProduto}= req.params
        const deleted = await produtoService.remove(idProduto)
        if(!deleted) {
            return res.status(404).json({error: 'Produto não encontrado'})
        }
        res.status(200).json({message: 'Cliente deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletar cliente' ,err)
        res.status(500).json({error: 'Erro ao deletar cliente, erro no servidor'})
    }
}