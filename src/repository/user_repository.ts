import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../entity/user_entity";
import { connection } from "./connection";


export class user_repository {


    static async getUser(email: string) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE email=?', [email]);
        if (rows.length === 1) {
            return new User({
                user_id: rows[0].user_id, demo: rows[0].demo, role: rows[0].role, organizationId: rows[0].organizationId, projectId: rows[0].projectId, name: rows[0].name, email: rows[0].email, password: rows[0].password, mobile: rows[0].mobile, createdAt: rows[0].createdAt, updatedAt: rows[0].updatedAt
            });
        }
        return null;

    }


    static async getAllCompanies() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user WHERE role LIKE  '%company%'`);


        return rows.map(row => new User({ user_id: row['user_id'], demo: row['demo'], role: row['role'], organizationId: row['organizationId'], projectId: row['projectId'], name: row['name'], email: row['email'], password: row['password'], mobile: row['mobile'], createdAt: row['createdAt'], updatedAt: row['updatedAt'] }));

    }



    static async getAllCandidates() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user WHERE role LIKE  '%candidate%'`);

        return rows.map(row => new User({ user_id: row['user_id'], demo: row['demo'], role: row['role'], organizationId: row['organizationId'], projectId: row['projectId'], name: row['name'], email: row['email'], password: row['password'], mobile: row['mobile'], createdAt: row['createdAt'], updatedAt: row['updatedAt'] }));

    }

    static async searchUsers(term: string) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%' + term + '%'])
        return rows.map(row => new User({ user_id: row['user_id'], demo: row['demo'], role: row['role'], organizationId: row['organizationId'], projectId: row['projectId'], name: row['name'], email: row['email'], password: row['password'], mobile: row['mobile'], createdAt: row['createdAt'], updatedAt: row['updatedAt'] }));
        /*         SELECT * FROM user WHERE name LIKE 'newbie'
         */
    }

    static async addUser(newUser) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>('INSERT INTO user (demo, role,organizationId, projectId,name, email,password, mobile,updatedAt) VALUES (?,?,?,?,?,?, ?,  ?,?)', [newUser.demo, newUser.role, newUser.organizationId, newUser.projectId, newUser.name, newUser.email, newUser.password, newUser.mobile, newUser.updatedAt]);
            newUser.user_id = addedUser.insertId;
        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */