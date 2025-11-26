import db from '../db/db.js'

export const findAll = async(minValor,maxValor,nome,idProduto) => {
// 1. define a consulta SQL base
let sql = 'SELECT * FROM produto';
// 2. Cria um array (vetor) para as condições WHERE
const conditions = [];
// 3. Cria um array para os valores (para previnir SQL Injection)
const values = [];

// 4. Adiciona as condições dinamicamente
// Adicionamos o filtro de menor valor
if (minValor) {
    conditions.push('valor >= ?');
    values.push(minValor);
}

if (maxValor) {
    conditions.push('valor <= ?');
    values.push(maxValor)
}
if (nome) {
    conditions.push('LOWER(nome_produto) LIKE ? ')
    values.push(`%${nome.toLowerCase()}%`)
}
if (idProduto) {
    conditions.push('idProduto = ?')
    values.push(idProduto)
}

// 5. Se houve condições, anexa elas á consulta SQL
if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
}

// 6. Executa a consulta final
const [rows] = await db.query(sql,values);
return rows
}

export const create = async (produtoData) => {

    const newProduto = produtoData

    await db.query('INSERT INTO produto SET ?', newProduto)
    return newProduto
}

export const update = async(idProduto, produtoData) => {
    const [result] = await db.query ('UPDATE cliente SET ? WHERE idproduto = ?', [idProduto,produtoData])
    return result.affectedRows > 0
}
