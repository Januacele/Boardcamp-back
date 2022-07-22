import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const user = process.env.USUARIO;
const password = process.env.SENHA;
const host = process.env.HOST;
const port = process.env.PORTPG;
const database = process.env.DATABASE_URL;

const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});

export default connection;