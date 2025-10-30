import express from 'express'
import * as clienteController from '../controllers/clienteController.js'
import validate from '../middlewares/validate.js'
import {clienteCreateSchema, clienteUpdateSchema} from '../controllers/clienteController.js'

import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// a rota de criação de cliente (registro) continua publica
router.post ('/', validate(clienteCreateSchema), clienteController.adicionarCliente)
// Rota final: post /api/clientes
router.use(authMiddleware)
// 2 . aplica o middleware em todas as rotas abaixo desta linha
// router.use(authMiddleware);// //descomentar para funcionar

// O caminho base '/api/clientes' ja foi definido no index.js
// Agora definimos apenas as partes relativas: '/' , '/:cpf' , etc.

router.get('/', clienteController.listarClientes); // rota final: GET /api/clientes
router.get('/:cpf', clienteController.listarClientesCpf); // Rota final: GET /api/clientes/:cpf

router.put('/:cpf', validate(clienteUpdateSchema), clienteController.atualizarCliente) // Rota final: PUT /api/clientes/:cpf
router.delete('/:cpf', clienteController.deletarCliente);

export default router
