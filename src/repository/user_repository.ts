import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../entity/user_entity";
import { connection } from "./connection";



export class user_repository {

    /**
     * @returns {Promise<User[]>} 
     */

    static async getUser(email:string) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE email=?', [email]);
        if (rows.length === 1) {
            return new User(rows[0].user_id, rows[0].demo, rows[0].role,rows[0].organizationId, rows[0].projectId,rows[0].name, rows[0].email,rows[0].password, rows[0].mobile,rows[0].createdAt, rows[0].updatedAt
                );
        }
        return null;

    }


    static async  getAllCompanies() {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE role LIKE company');
    
    
       /*  const allCompanies = [];
        for (const row of rows) {
            let instance = new User(rows['user_id'], rows.demo, rows.role,rows.organizationId, rows.projectId,rows.name, rows.email,rows.password, rows.mobile,rows.createdAt, rows.updatedAt);
            allCompanies.push(instance);
    
        }
        return allCompanies; */

        return rows.map(row => new User(row['user_id'], row['demo'], row['role'], row['organizationId'],row['projectId'], row['name'], row['email'], row['password'], row['mobile'], row['createdAt'], row['updatedAt']));


    
    }
    
    

    static async getAllCandidates() {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * From user WHERE role LIKE candidate');

        return rows.map(row => new User(row['user_id'], row['demo'], row['role'], row['organizationId'],row['projectId'], row['name'], row['email'], row['password'], row['mobile'], row['createdAt'], row['updatedAt']));

    }

    static async searchUsers(term:string) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%' + term + '%'])
        return rows.map(row => new User(row['user_id'], row['demo'], row['role'], row['organizationId'],row['projectId'], row['name'], row['email'], row['password'], row['mobile'], row['createdAt'], row['updatedAt']));


    }

    static async addUser(user:User) {
        const [addedUser] = await connection.query<ResultSetHeader>('INSERT INTO user (demo, role,organizationId, projectId,name, email,password, mobile,createdAt, updatedAt) VALUES (?,?,?,?, ?, ?, ?, ? , ?, ?, ?)', [user.demo, user.role, user.organizationId, user.projectId, user.name, user.email, user.mobile, user.createdAt, user.updatedAt]);
        user.user_id = addedUser.insertId;

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */