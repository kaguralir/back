import { createConnection, getManager, getConnection } from "typeorm";
import { User } from "../src/entity/user_entity";
import { createPool } from "mysql2/promise";


export const connection = createPool({uri:process.env.DATABASE_URL});

export function setUpTestDatabase() {
    const db = require('better-sqlite3');

    const row = db.prepare('SELECT * FROM user').get(userFixtures);
    console.log(row.name, row.role, row.email);
    beforeEach(async () => {
        
        await userFixtures();
    });
    

    afterEach(async () => {
        await db.end();
        return row;
    })
}




async function userFixtures() {
    await getManager().insert(User, [
        {name: 'new1', role: 'candidat', email:'1234', password:'1234'},
        {name: 'new2', role: 'company', email:'1234', password:'1234'},
        {name: 'new3', role: 'candidat', email:'1234', password:'1234'},
    ]);
}


