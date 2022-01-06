import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CandidatActivity } from "../../entity/mutualActivity/candidatActivity_entity";
import { connection } from "../connection";


export class candidatActivity_repository {

    /**
     * @returns {Promise<CandidatActivity[]>} 
     */


     static async addCandidateThumbsNumber(candidat_id, jobThumbActivity_id, candidatThumbStatus) {
        await connection.query(
    
            "INSERT INTO candidatThumbsActivity (candidat_id, jobThumbActivity_id, candidatThumbStatus, candidatThumbStatus) VALUES (?,?,?)",
            [candidat_id.candidat_id, jobThumbActivity_id.jobThumbActivity_id,candidatThumbStatus.candidatThumbStatus]
        );
    }
    
    
    static async cancelCandidateThumb(candidat_id, jobThumbActivity_id) {
        await connection.execute('DELETE FROM Likes WHERE candidat_id=? AND jobThumbActivity_id=?', [candidat_id, jobThumbActivity_id]);
/*         await connection.execute('UPDATE mutualThumbsUp SET mutualRecruiter_id=? AND mutualCandidate_id=? likes=(select COUNT(*) from Likes WHERE uploads_id=?) WHERE id=?', [uploads_id, uploads_id])
 */    }
    


    static async  getAllCandidateThumbs() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM candidatThumbsActivity WHERE candidatThumbStatus LIKE  '%1%'`);
    

        return rows.map(row => new CandidatActivity({thumb_id:row['thumb_id'],candidat_id: row['candidat_id'], jobThumbActivity_id:row['jobThumbActivity_id'],candidatThumbStatus: row['candidatThumbStatus']}));
    
    }
    
    static async  getMutualThumbsUp() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM recruiterThumbsActivity JOIN  candidatThumbsActivity ON recruiterThumbsActivity.candidat_id=candidatThumbsActivity.candidat_id WHERE recruiterThumbStatus=1 AND candidatThumbStatus=1;
        `);

        console.log("get mutual thumbs up is",rows)
        return rows;
    
    }
    



}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */