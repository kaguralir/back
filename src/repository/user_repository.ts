import { User } from "../entity/user_entity";
import { connection } from "./connection";



export class user_repository {

    /**
     * @returns {Promise<User[]>} 
     */

    static async getUser(email:string) {
        const [rows] = await connection.query('SELECT * FROM user WHERE email=?', [email]);
        if (rows.length === 1) {
            return new User(rows[0].user_id, rows[0].demo, rows[0].role,rows[0].organizationId, rows[0].projectId,rows[0].name, rows[0].email,rows[0].password, rows[0].mobile,rows[0].createdAt, rows[0].updatedAt
                );
        }
        return null;

    }


    static async  getAllCompanies() {
        const [rows] = await connection.execute('SELECT * FROM user WHERE role LIKE company');
    
    
        const allCompanies = [];
        for (const row of rows) {
            let instance = new User(rows.user_id, rows.demo, rows.role,rows.organizationId, rows.projectId,rows.name, rows.email,rows.password, rows.mobile,rows.createdAt, rows.updatedAt);
            allCompanies.push(instance);
    
        }
        return allCompanies;
    
    }
    
    

    static async getAllCandidates() {
        const [rows] = await connection.query('SELECT * From user WHERE role LIKE candidate');

        const allCandidates = [];
        for (const row of rows) {
            let instance = new User(rows.user_id, rows.demo, rows.role,rows.organizationId, rows.projectId,rows.name, rows.email,rows.password, rows.mobile,rows.createdAt, rows.updatedAt);
            allCandidates.push(instance);
    
        }
        return allCandidates;
    }

    static async searchUsers(term:string) {
        const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%' + term + '%'])
        const searchedUsers = [];
        for (const row of rows) {
            let instance = new User(rows.user_id, rows.demo, rows.role,rows.organizationId, rows.projectId,rows.name, rows.email,rows.password, rows.mobile,rows.createdAt, rows.updatedAt);
            searchedUsers.push(instance);
    
        }
        return searchedUsers;

    }

    static async addUser(user:User) {
        const [addedUser] = await connection.query('INSERT INTO user (demo, role,organizationId, projectId,name, email,password, mobile,createdAt, updatedAt) VALUES (?,?,?,?, ?, ?, ?, ? , ?, ?, ?)', [user.demo, user.role, user.organizationId, user.projectId, user.name, user.email, user.mobile, user.createdAt, user.updatedAt]);
        user.user_id = addedUser.insertId;

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */