import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Interest } from "../../entity/interest/interest_entity";
import { User } from "../../entity/user_entity";
import { connection } from "../connection";


export class interest_repository {

    /**
     * @returns {Promise<Interest[]>} 
     */

    static async candidateInterest(job_id: number, candidate_id: number) {
        try {
            await connection.query<ResultSetHeader>('INSERT INTO interest (jobApplied_id,candidateWhoApplied_id) VALUES (?,?)',
                [job_id, candidate_id]);

        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }


    static async candidateAnswer(interest_id: number, job_id: number, candidate_id: number, answer: number) {
        try {
            const [addedApplication] = await connection.execute<ResultSetHeader>('UPDATE interest SET interest = ?  WHERE candidateWhoApplied_id=? AND recruiterJobOffer_id=? AND interest=NULL',
                [interest_id, job_id, candidate_id, answer]);
            interest_id = addedApplication.insertId;
        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }





    static async recruiterInterest(job_id, candidat_id, recruiter_id) {

        await connection.query<ResultSetHeader>(`INSERT INTO interest (jobApplied_id,candidateWhoApplied_id,recruiterJobOffer_id) VALUES (?,?,?)`, [job_id.jobApplied_id, candidat_id.candidateWhoApplied_id, recruiter_id.recruiterJobOffer_id]);
    }




    static async recruiterAnswer(interest_id, job_id, candidate_id, interest) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest =? WHERE interest_id=? AND jobApplied_id=? AND candidateWhoApplied_id=?`, [interest_id.interest_id, job_id.jobApplied_id, candidate_id.candidateWhoApplied_id, interest.interest]);
            interest_id.interest_id = addedUser.insertId;
        }
        catch (err) {
            console.log("recruiterAnswer repo err is", err)
        }

    }

    static async getCandidatesWithInterestByJob(job_id) {
        try {
            const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
        INNER JOIN interest WHERE user_id = candidateWhoApplied_id  AND jobApplied_id=? AND interest IS NULL AND role="candidat"`, [job_id.jobApplied_id]);

            return rows
        }
        catch (err) {
            console.log("ca interest is error", err);
            return
        }
    }




    static async getCandidateInterestedByJob(jobApplied_id: number, candidat_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
                INNER JOIN interest WHERE user_id = candidateWhoApplied_id AND jobApplied_id=? AND candidateWhoApplied_id=? AND interest IS NULL AND role="candidat" `, [jobApplied_id, candidat_id]);

            /*    const candidateList = [];
               for (const row of rows) {
                   let instance = new Interest(row.interest_id, row.jobApplied_id, row.candidateWhoApplied_id, row.recruiterJobOffer_id, row.interest);
                   candidateList.push(instance);
   
               }
               return candidateList; */
            /*  return row; */

            /*             return row.map(item => new Interest(item['interest_id'], item['jobApplied_id'], item['candidateWhoApplied_id'], item['recruiterJobOffer_id'], item['interest']));
             */
            console.log("row", row);

            return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);


        }
        catch (err) {
            console.log("ca interest is error", err);
            return
        }
    }
    static async getJobCandidatesWithoutInterestByJob(job_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user LEFT OUTER JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id NOT LIKE ? OR jobApplied_id IS NULL AND role="candidat"`, [job_id]);

        return rows.map(row => new User({
            user_id: row['user_id']
        }));

    }


    static async getInterestedRecruiterPerJob(job_id: number, candidat_id: number) {
        const row = await connection.query<RowDataPacket[]>(`SELECT * FROM user JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id =?  AND  candidateWhoApplied_id=? AND recruiterJobOffer_id IS NOT NULL AND interest IS NULL`, [job_id, candidat_id]);

        console.log("row getInterestedRecruiterPerJob", row);

        /*         return new Interest(row['interest_id'], row['jobApplied_id'], row['candidateWhoApplied_id'], row['recruiterJobOffer_id'], row['interest']);
         */

        return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */