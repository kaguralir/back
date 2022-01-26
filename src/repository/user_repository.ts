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
    static async getProfile(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user CROSS  JOIN uploads ON user_id = userUploader_id WHERE user_id=?', [user_id]);

        return rows;

    }



    static async getAllCompanies() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user WHERE role LIKE  '%recruteur%'`);


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
            const [addedUser] = await connection.query<ResultSetHeader>(`INSERT INTO user (name,role,email, password) VALUES(?,?,?,?)`, [newUser.name, newUser.role, newUser.email, newUser.password]);
            newUser.user_id = addedUser.insertId;

            for (const val of newUser.images) {


                await connection.query<ResultSetHeader>(`INSERT INTO uploads(userUploader_id,fileName) VALUES(?,?) ;`, [newUser.user_id, val.fileName]);

            }
            await connection.query<ResultSetHeader>(`INSERT INTO uploads(userUploader_id,pdfFileName) VALUES(?,?) ;`, [newUser.user_id, newUser.pdfs.pdfFileName]);

            /*             for (const val of newUser.pdfs) {
                            console.log("val is PDF ====>", val);
            
                            await connection.query<ResultSetHeader>(`INSERT INTO uploads(userUploader_id,pdfFileName) VALUES(?,?) ;`, [newUser.user_id, val.filename]);
                        } */

        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }
    /*     const [addUploads] = await connection.query<ResultSetHeader>(`INSERT INTO uploads(user_id,fileName) VALUES(?,?) SET user_id=LAST_INSERT_ID();`, [newUser.user_id, uploads.fileName]);
        console.log("addUploads REPO", addUploads); */
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */