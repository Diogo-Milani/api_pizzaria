import db from '../db/db.js'
import bcrypt from 'bcrypt'

export const findAll = async() => {
    const [result] = await db.query('SELECT * FROM cliente')
    return result;
};

export const findByCpf = async (cpf) => {
    const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
    return result.length > 0 ? result [0] : null;
};

export const findByEmail = async (email) => {
    const [result] = await db.query('SELECT * FROM cliente WHERE email = ?',[email])
    return result.length > 0 ? result [0] : null
}

export const create = async (clienteData) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(clienteData.senha, saltRounds)

    const newCliente = {
        ...clienteData,
        senha: hashedPassword,
    }

    await db.query('INSERT INTO cliente SET ?', newCliente)

    delete newCliente.senha
    return newCliente
}

export const update = async (cpf, clienteData) => {
    if (clienteData.senha) {
        const saltRounds = 10
        clienteData.senha = await bcrypt.hash(clienteData.senha, saltRounds)
    }
    const [result] = await db.query ('UPDATE client SET ? WHERE cpf = ?', [clienteData,cpf])
    return result.affectedRows > 0
}

export const remove = async (cpf) => {
    const [result] = await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf])
    return result.affectedRows > 0
}

    