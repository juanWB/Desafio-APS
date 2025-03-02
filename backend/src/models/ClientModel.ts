import connection from "../config/db";

interface Client {
    cnpj: string;
    nome: string;
    nome_fantasia: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento?: string;
    email: string;
    telefone: string;
}

export const checkCnpjExists = async (cnpj: string) => {
    const query = 'SELECT COUNT(*) as count FROM clientes WHERE cnpj = ?';
    const [rows] = await connection.execute(query, [cnpj]);
    const rowCount = (rows as { count: number }[])[0].count;

    return rowCount > 0;
}

export const createClient = async (client: Client) => {

    if (await checkCnpjExists(client.cnpj)) {
        throw new Error('CNPJ ja cadastrado.');
    }

    const query = 'INSERT INTO clientes ' +
        '(cnpj, nome, nome_fantasia, cep, logradouro, bairro,' +
        'cidade, uf, complemento, email, telefone) ' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const [result] = await connection.query(query,
        [client.cnpj, client.nome, client.nome_fantasia,
        client.cep, client.logradouro, client.bairro,
        client.cidade, client.uf, client.complemento ?? null,
        client.email, client.telefone]);

    return result;
}

export const getClients = async () => {
    const query = 'SELECT * FROM clientes';
    const [result] = await connection.query(query);

    return result;
}

export const updateClient = async (cnpj: string, client: Client) => {

    const query = 'UPDATE clientes SET nome = ?,' +
        'nome_fantasia = ?, cep = ?, logradouro = ?, bairro = ?, cidade = ?,' +
        ' uf = ?, complemento = ?, email = ?, telefone = ? WHERE cnpj = ?';

    const [result] = await connection.execute(query, [
        client.nome, client.nome_fantasia, client.cep,
        client.logradouro, client.bairro, client.cidade,
        client.uf, client.complemento ?? null,
        client.email, client.telefone, cnpj
    ]);

    return result;
}

export const deleteClient = async (cnpj: string) => {
    
    const query = 'DELETE FROM clientes WHERE cnpj = ?';
    const [result] = await connection.query(query, [cnpj]);

    return result;
}



