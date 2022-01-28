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


            const [rows] = await connection.query<ResultSetHeader>(
                `INSERT INTO interest (jobApplied_id,candidateWhoApplied_id) VALUES (?,?)`,
                [job_id, candidate_id])

            console.log("ROWS INTEREST", rows);


        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }


    static async candidateAnswer(answer: number, interest_id: number) {
        try {
            const [addedApplication] = await connection.query<ResultSetHeader>('UPDATE interest SET interest = ?  WHERE interest_id=? AND recruiterJobOffer_id IS NOT NULL ',
                [answer, interest_id]);

            console.log('candidate answer', addedApplication);

        }
        catch (err) {
            console.log("add application repo err is", err)
        }

    }

    static async updateCandidateAnswer(interest_id: number, job_id: number, candidate_id: number, interest: number) {
        try {
            const [updateCandidateAnswer] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest =? WHERE interest_id=? AND jobApplied_id=? AND candidateWhoApplied_id=? AND recruiterJobOffer_id IS NULL`, [interest_id, job_id, candidate_id, interest]);

        }
        catch (err) {
            console.log("updateCandidateAnswer repo err is", err)
        }

    }

    static async deleteCandidateInterest(interest_id: number, candidat_id: number) {
        try {
            await connection.query('DELETE FROM interest WHERE interest_id=? AND candidateWhoApplied_id=? AND recruiterJobOffer_id IS NULL', [interest_id, candidat_id]);
        }
        catch (err) {
            console.log("deleteCandidateInterest repo err is", err)
        }

    }





    static async recruiterInterest(job_id: number, candidat_id: number, recruiter_id: number) {
        console.log("RECRUITER", job_id, candidat_id, recruiter_id);

        await connection.query<ResultSetHeader>(`INSERT INTO interest (jobApplied_id,candidateWhoApplied_id,recruiterJobOffer_id) VALUES (?,?,?)`, [job_id, candidat_id, recruiter_id]);
    }




    static async recruiterAnswer(interest_id: number, job_id: number, candidate_id: number, interest: number) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest =? WHERE interest_id=? AND jobApplied_id=? AND candidateWhoApplied_id=?`, [interest_id, job_id, candidate_id, interest]);

        }
        catch (err) {
            console.log("recruiterAnswer repo err is", err)
        }

    }

    static async updateRecruiterAnswer(interest_id: number, job_id: number, candidate_id: number, recruiterJobOffer_id: number, interest: number) {
        try {
            const [addedUser] = await connection.query<ResultSetHeader>(`UPDATE interest SET interest =? WHERE interest_id=? AND jobApplied_id=? AND candidateWhoApplied_id=? AND recruiterJobOffer_id=?`, [interest_id, job_id, candidate_id, recruiterJobOffer_id, interest]);

        }
        catch (err) {
            console.log("updateRecruiterAnswer repo err is", err)
        }

    }

    static async deleteRecruiterInterest(interest_id: number, recruiterJobOffer_id: number) {
        try {
            await connection.query('DELETE FROM interest WHERE interest_id=? AND recruiterJobOffer_id=?', [interest_id, recruiterJobOffer_id]);
        }
        catch (err) {
            console.log("deleteRecruiterInterest repo err is", err)
        }

    }

    static async getCandidatesWithInterestByJob(job_id) {
        try {
            const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
        INNER JOIN interest WHERE user_id = candidateWhoApplied_id  AND jobApplied_id=? AND interest IS NULL AND role="candidat"`, [job_id.jobApplied_id]);

            return rows
        }
        catch (err) {
            console.log("getCandidatesWithInterestByJob is error", err);
            return
        }
    }




    static async getCandidateInterestedByJob(jobApplied_id: number, candidat_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM user 
                INNER JOIN interest WHERE user_id = candidateWhoApplied_id AND jobApplied_id=? AND candidateWhoApplied_id=? AND interest IS NULL AND role="candidat" AND recruiterJobOffer_id IS NULL `, [jobApplied_id, candidat_id]);

            console.log("getCandidateInterestedByJob", row);
            if (row.length === 1) {
                return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);

            }
            return null;


        }
        catch (err) {
            console.log("getCandidateInterestedByJob is error", err);
            return
        }
    }
    static async getJobCandidatesWithoutInterestByJob(job_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user   LEFT OUTER JOIN uploads ON user_id=userUploader_id LEFT OUTER JOIN searchedJob ON user_id=candidat_id  LEFT OUTER JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id NOT LIKE ? OR jobApplied_id IS NULL AND role="candidat" GROUP BY user_id ;`, [job_id]);

        return rows;

    }


    static async getInterestedRecruiterPerJob(job_id: number, candidat_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM user JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id =?  AND  candidateWhoApplied_id=? AND recruiterJobOffer_id IS NOT NULL AND interest IS NULL`, [job_id, candidat_id]);
            /* 
                    console.log("row getInterestedRecruiterPerJob", row); */

            /*         return new Interest(row['interest_id'], row['jobApplied_id'], row['candidateWhoApplied_id'], row['recruiterJobOffer_id'], row['interest']);
             */

            if (row.length === 1) {
                return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);

            }
            return null;
        }
        catch (err) {
            console.log("get interest recruiter error", err);

        }

    }

    static async getCandidatAnswer(job_id: number, candidat_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM user JOIN interest ON user_id=candidateWhoApplied_id WHERE jobApplied_id =?  AND  candidateWhoApplied_id=? AND recruiterJobOffer_id IS NOT NULL AND interest IS NOT NULL`, [job_id, candidat_id]);

            console.log(row);

            if (row.length === 1) {
                return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);

            }
            return null;
        }
        catch (err) {
            console.log("getCandidatAnswer", err);

        }

    }

    static async getRecruiterAnswer(job_id: number, candidat_id: number) {
        try {
            const [row] = await connection.query<RowDataPacket[]>(`SELECT * FROM joboffers JOIN interest ON joboffer_id=jobApplied_id WHERE jobApplied_id =?  AND  candidateWhoApplied_id=? AND recruiterJobOffer_id IS NULL AND interest IS NOT NULL`, [job_id, candidat_id]);

            console.log(row);

            if (row.length === 1) {
                return new Interest(row[0]['interest_id'], row[0]['jobApplied_id'], row[0]['candidateWhoApplied_id'], row[0]['recruiterJobOffer_id'], row[0]['interest']);

            }
            return null;
        }
        catch (err) {
            console.log(" getRecruiterAnswer error", err);

        }

    }


}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */