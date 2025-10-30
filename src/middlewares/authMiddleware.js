import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
//1. Buscar o token no cabeçalho da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: 'Token de autenticação não fornecido.'});
    }


// O formato do token é "Bearer TOKEN". Precisamos separar as duas partes.
const parts = authHeader.split(' '); //colocar um espacinho entre as aspas
if (parts.length !== 2) {
    return res.status(401)({message: "Token em formato inválido."});
}

const [scheme, token] = parts; // verifica se o token foi formado corretamente    ,,,
if(!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({message: "Token mal formatado."});
}

// 2. validar o Token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({message: "Token inválido ou expirado."});
    }

//3. Se o token for válido, adicionamos os dados do usuário na requisição
req.userCpf = decoded.cpf;
req.userEmail = decoded.email;

//4. chama o p´roximo middleware ou o contorlador final
return next();
});
};

export default authMiddleware