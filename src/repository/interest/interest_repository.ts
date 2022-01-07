import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Interest } from "../../entity/interest/interest_entity";
import { connection } from "../connection";


export class interest_repository {

    /**
     * @returns {Promise<Interest[]>} 
     */

    static async candidateInterest( job_id, candidate_id,candidateApplication: Interest,) {
        try {
            const [addedApplication] = await connection.query<ResultSetHeader>('INSERT INTO interest (jobApplied_id,candidateWhoApplied_id) VALUES (?,?)',
                [job_id.jobApplied_id, candidate_id.candidateWhoApplied_id]);
            candidateApplication.interest_id = addedApplication.insertId;
        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }


    static async candidateAnswer( job_id, recruiter_id,candidateApplication: Interest) {
        try {
            const [addedApplication] = await connection.query<ResultSetHeader>('UPDATE interest SET interest = ?  WHERE candidateWhoApplied_id=? AND recruiterJobOffer_id=? AND interest=NULL',
                [job_id.jobApplied_id, recruiter_id.recruiterJobOffer_id, candidateApplication.interest]);
            candidateApplication.interest_id = addedApplication.insertId;
        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }



    static async recruiterInterest(interest: Interest,job_id, candidate_id) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`INSERT INTO interest (jobApplied_id,candidateWhoApplied_id,recruiterJobOffer_id) VALUES (?,?,?)`, [job_id.jobApplied_id, candidate_id.candidateWhoApplied_id, interest.recruiterJobOffer_id]);
            interest.interest_id = addedUser.insertId;
        }
        catch (err) {
            console.log("recruiterInterest repo err is", err)
        }

    }

    static async recruiterAnswer(answer: Interest,job_id) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest =? WHERE jobApplied_id = ? AND candidateWhoApplied_id=?`, [answer.interest]);
            answer.interest_id= addedUser.insertId;
        }
        catch (err) {
            console.log("recruiterAnswer repo err is", err)
        }

    }

    static async getCandidatesWithInterest() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
        INNER JOIN interest WHERE user_id = candidateWhoApplied_id AND jobApplied_id=? AND interest IS NULL  `);

        return rows.map(row => new Interest({
            interest_id: row['interest_id'], jobApplied_id: row['jobApplied_id'], candidateWhoApplied_id: row['candidateWhoApplied_id'], recruiterJobOffer_id: row['recruiterJobOffer_id'], interest: row['interest']
        }));

    }

    static async getCandidatesWithoutInterest() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user LEFT OUTER JOIN interest ON user_id=candidateWhoApplied_id WHERE candidateWhoApplied_id IS NULL AND role="candidat";`);

        return rows.map(row => new Interest({
            interest_id: row['interest_id'], jobApplied_id: row['jobApplied_id'], candidateWhoApplied_id: row['candidateWhoApplied_id'], recruiterJobOffer_id: row['recruiterJobOffer_id'], interest: row['interest']
        }));

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */