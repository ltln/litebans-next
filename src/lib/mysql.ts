import mysql, { RowDataPacket } from 'mysql2';
import { config } from './config';

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default async function sql({ q, v }: {q: string, v: any}) {
  const promisePool = pool.promise();
  const data = await promisePool.query(q, v);
  return (data[0] as RowDataPacket[]);
}