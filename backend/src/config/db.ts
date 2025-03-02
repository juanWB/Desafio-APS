import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'crud'
}

const connection = mysql.createPool(dbConfig);

export default connection;