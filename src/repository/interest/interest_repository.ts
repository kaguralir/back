import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Interest } from "../../entity/interest/interest_entity";
import { connection } from "../connection";


export class interest_repository {

    /**
     * @returns {Promise<Interest[]>} 
     */

    static async getCandidatesWhoApplied() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM interest WHERE jobApplied_id=?`);

        return rows.map(row => new Interest({interest_id:row['interest_id'],jobApplied_id: row['jobApplied_id'], candidateWhoApplied_id: row['candidateWhoApplied_id'], recruiterJobOffer_id: row['recruiterJobOffer_id'], interest:row['interest']
    }));

    }
/* interest_id:row['interest_id'],jobApplied_id: row['jobApplied_id'], candidateWhoApplied_id: row['candidateWhoApplied_id'], recruiterJobOffer_id: row['recruiterJobOffer_id'], interest:row['interest']
    interest_id,jobApplied_id,candidateWhoApplied_id,recruiterJobOffer_id,interest */  

    static async candidateApplying(candidateApplication:Interest) {
        try{
        const [addedApplication] = await connection.query<ResultSetHeader>('INSERT INTO interest (jobApplied_id,candidateWhoApplied_id,interest) VALUES (?,?,?)',
         [candidateApplication.jobApplied_id,candidateApplication.candidateWhoApplied_id,candidateApplication.interest]);
         candidateApplication.interest_id= addedApplication.insertId;
    }
        catch(err){
            console.log("add application repo err is", err)
        }

    }

    UPDATE interest SET interest = 1 WHERE jobApplied_id = 1 AND candidateWhoApplied_id=2;

    static async candidateAnswer(candidateApplication:Interest, job_id, candidate_id) {
        try{
        const [addedApplication] = await connection.query<ResultSetHeader>('UPDATE interest SET interest = 1 WHERE jobApplied_id = ? AND candidateWhoApplied_id=?',
         [job_id.jobApplied_id,candidate_id.candidateWhoApplied_id,candidateApplication.interest]);
         candidateApplication.interest_id= addedApplication.insertId;
    }
        catch(err){
            console.log("add application repo err is", err)
        }

    }



    static async recruiterLikingCandidate(likingCandidate:Interest) {
        try{
        const [addedUser] = await connection.query<ResultSetHeader>(`INSERT INTO interest (jobApplied_id,candidateWhoApplied_id,interest) VALUES (?,?,?)`, [user.demo, user.role, user.organizationId, user.projectId, user.name, user.email, user.password, user.mobile,  user.updatedAt]);
        likingCandidate.user_id = addedUser.insertId;
    }
        catch(err){
            console.log("adduser repo err is", err)
        }

    }

    static async recruiterAnswer(likingApplier:Interest) {
        try{
        const [addedUser] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest = 1 WHERE jobApplied_id = ? AND candidateWhoApplied_id=?`, [user.demo, user.role, user.organizationId, user.projectId, user.name, user.email, user.password, user.mobile,  user.updatedAt]);
        likingApplier.user_id = addedUser.insertId;
    }
        catch(err){
            console.log("adduser repo err is", err)
        }

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */