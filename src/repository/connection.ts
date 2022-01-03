import { createPool } from "mysql2/promise";


export const connection = createPool({uri:process.env.DATABASE_URL});
