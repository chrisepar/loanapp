
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT, // default Postgres port
    database: process.env.DATABASE_NAME 
});

export default pool;