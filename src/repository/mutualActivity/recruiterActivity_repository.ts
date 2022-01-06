import { ResultSetHeader, RowDataPacket } from "mysql2";
import { RecruiterActivity } from "../../entity/mutualActivity/recruiterActivity_entity";
import { connection } from "../connection";


export class recruiterActivity_repository {

    /**
     * @returns {Promise<RecruiterActivity[]>} 
     */

     static async addRecruiterThumbsNumber(candidat_id, jobThumbActivity_id, candidatThumbStatus) {
        await connection.query(
    
            "INSERT INTO candidatThumbsActivity (candidat_id, jobThumbActivity_id, candidatThumbStatus, candidatThumbStatus) VALUES (?,?,?)",
            [candidat_id.candidat_id, jobThumbActivity_id.jobThumbActivity_id,candidatThumbStatus.candidatThumbStatus]
        );
    }
    
    
    static async cancelRecruiterThumb(candidat_id, jobThumbActivity_id) {
        await connection.execute('DELETE FROM Likes WHERE candidat_id=? AND jobThumbActivity_id=?', [candidat_id, jobThumbActivity_id]);
/*         await connection.execute('UPDATE mutualThumbsUp SET mutualRecruiter_id=? AND mutualCandidate_id=? likes=(select COUNT(*) from Likes WHERE uploads_id=?) WHERE id=?', [uploads_id, uploads_id])
 */    }
    


    static async  getAllRecruiterThumbs() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM crecruiterThumbsActivity WHERE candidatThumbStatus LIKE  '%1%'`);
    

        return rows.map(row => new RecruiterActivity({thumb_id:row['thumb_id'],recruiterThumb_id:row['recruiterThumb_id'],candidat_id: row['candidat_id'],recruiterThumbStatus: row['recruiterThumbStatus']}));
    
    }

}
