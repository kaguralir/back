import { ResultSetHeader, RowDataPacket } from "mysql2";
import { jobOffer } from "../../entity/jobs/jobOffer_entity";
import { JobOffers } from "../../entity/recruiter/jobOffers_entity";
import { User } from "../../entity/user_entity";

import { connection } from "../connection";


export class jobOffers_repository {

    /**
     * @returns {Promise<jobOffer[]>} 
     */



    static async getAllJobOffers() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers`);


        return rows.map(row => new JobOffers({ jobOffer_id: row['jobOffer_id'], recruiter_id: row['recruiter_id'], available: row['available'], organizationName: row['organizationName'], jobProject_id: row['jobProject_id'], jobOffer_role: row['jobOffer_role'], jobOffer_description: row['jobOffer_description'], createdAt: row['createdAt'], updatedAt: row['updatedAt'] }
        ));

    }



    static async addJob(recruiter_id: any, addingJob: any) {
        try {
            const [addedJob] = await connection.query<ResultSetHeader>('INSERT INTO jobOffers (recruiter_id,remote,organizationName,jobOffer_role,jobOffer_description,country,city) VALUES (?,?,?,?,?,?,?,?)', [recruiter_id.recruiter_id, addingJob.remote, addingJob.organizationName, addingJob.jobOffer_role, addingJob.jobOffer_description, addingJob.country, addingJob.city]);
            console.log("addedJob", addedJob);

        }
        catch (err) {
            console.log("add job offer repo err is", err)
        }

    }





    static async getJobs(candidate_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers LEFT OUTER JOIN interest ON jobOffer_id=jobApplied_id WHERE candidateWhoApplied_id NOT LIKE ? AND recruiterJobOffer_id IS NULL OR recruiterJobOffer_id IS NOT NULL AND interest IS NULL AND candidateWhoApplied_id LIKE ? OR interest_id IS NULL`, [candidate_id]);

        return rows.map(row => new jobOffer({
            jobOffer_id: row['jobOffer_id'], jobOffer_role: row['jobOffer_role']
        }));

    }

    static async getCandidate(recruiter_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM user LEFT OUTER JOIN interest ON user_id=candidateWhoApplied_id WHERE recruiterJobOffer_id NOT LIKE ? OR recruiterJobOffer_id IS NULL OR interest_id IS NULL`, [recruiter_id]);

        return rows.map(row => new User({
            user_id: row['user_id']
        }));

    }

}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */