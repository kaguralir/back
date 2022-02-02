import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Uploads } from "../entity/uploads_entity";
import { connection } from "./connection";
import { user_repository } from "./user_repository";


export class uploads_repository {


    static async findByPerson(user_id: number, withPerson = false) {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM uploads WHERE userUploader_id=?", [user_id]);
        
     
        return rows;
    }
    static async getSearchedJob(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM searchedJob WHERE candidat_id=?', [user_id]);

        return rows;

    }
    static async getSkillsForSearchedJob(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM skills WHERE candidatSkills_id=?', [user_id]);

        return rows;

    }

    
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */