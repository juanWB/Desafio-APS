import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
}

const connection = mysql.createPool(dbConfig);

export default connection;
