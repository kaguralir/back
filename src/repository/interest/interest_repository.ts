import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Interest } from "../../entity/interest/interest_entity";
import { User } from "../../entity/user_entity";
import { connection } from "../connection";


export class interest_repository {

    /**
     * @returns {Promise<Interest[]>} 
     */

    static async candidateInterest(job_id, candidate_id, candidateApplication) {
        try {
            const [addedApplication] = await connection.query<ResultSetHeader>('INSERT INTO interest (jobApplied_id,candidateWhoApplied_id) VALUES (?,?)',
                [job_id.jobApplied_id, candidate_id.candidateWhoApplied_id]);
            candidateApplication.interest_id = addedApplication.insertId;
        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }


    static async candidateAnswer(job_id, candidateApplication) {
        try {
            const [addedApplication] = await connection.query<ResultSetHeader>('UPDATE interest SET interest = ?  WHERE candidateWhoApplied_id=? AND recruiterJobOffer_id=? AND interest=NULL',
                [job_id.jobApplied_id, candidateApplication.interest]);
            candidateApplication.interest_id = addedApplication.insertId;
        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }



    static async recruiterInterest(interest, job_id, candidate_id) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`INSERT INTO interest (jobApplied_id,candidateWhoApplied_id,recruiterJobOffer_id) VALUES (?,?,?)`, [job_id.jobApplied_id, candidate_id.candidateWhoApplied_id, interest.recruiterJobOffer_id]);
            interest.interest_id = addedUser.insertId;
        }
        catch (err) {
            console.log("recruiterInterest repo err is", err)
        }

    }

    static async recruiterAnswer(answer: Interest, job_id) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest =? WHERE jobApplied_id = ? AND candidateWhoApplied_id=?`, [answer.interest]);
            answer.interest_id = addedUser.insertId;
        }
        catch (err) {
            console.log("recruiterAnswer repo err is", err)
        }

    }

    static async getCandidatesWithInterestByJob(job_id) {
        try {
            const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
        INNER JOIN interest WHERE user_id = candidateWhoApplied_id AND jobApplied_id=? AND interest IS NULL AND role="candidat"`, [job_id]);

            return rows
        }
        catch (err) {
            console.log("ca interest is error", err);
            return
        }
    }




    static async getCandidateInterestedByJob(job_id, candidat_id) {
        try {
            const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
                INNER JOIN interest WHERE user_id = candidateWhoApplied_id AND jobApplied_id=2 AND candidateWhoApplied_id=6 AND interest IS NULL AND role="candidat"`, [job_id, candidat_id]);

            return rows
        }
        catch (err) {
            console.log("ca interest is error", err);
            return
        }
    }
    static async getJobCandidatesWithoutInterestByJob(job_id) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user LEFT OUTER JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id NOT LIKE ? OR jobApplied_id IS NULL AND role="candidat"`, [job_id]);

        return rows.map(row => new User({
            user_id: row['user_id']
        }));

    }


    static async getInterestedRecruiterPerJob(job_id, candidat_id) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id =?  AND  candidateWhoApplied_id=? AND recruiterJobOffer_id IS NOT NULL AND interest IS NULL`, [job_id, candidat_id]);

        return rows
    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */