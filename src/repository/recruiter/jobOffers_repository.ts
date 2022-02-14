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
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers ORDER BY RAND()`);


        return rows.map(row => new JobOffers({ jobOffer_id: row['jobOffer_id'], recruiter_id: row['recruiter_id'], available: row['available'], organizationName: row['organizationName'], jobProject_id: row['jobProject_id'], jobOffer_role: row['jobOffer_role'], jobOffer_description: row['jobOffer_description'], createdAt: row['createdAt'], updatedAt: row['updatedAt'] }
        ));

    }

    static async getJobsWithoutCandidateInterest(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers LEFT OUTER JOIN interest ON jobOffer_id=jobApplied_id WHERE jobApplied_id IS NULL OR recruiterJobOffer_id IS NOT NULL AND interest IS NULL AND candidateWhoApplied_id=?;`, [user_id]);

        return rows;

    }



    static async addJob(recruiter_id: number, addingJob) {
        try {
            console.log("addedJob", addingJob.values.Remote);
            console.log("addedJob", addingJob.values.orgName);
            console.log("addedJob", addingJob.values.jobRole);
            console.log("addedJob", addingJob.values.jobDescription);
            console.log("addedJob", addingJob.values.Country);
            console.log("addedJob", addingJob.values.City);
            console.log("addedJob", addingJob.tagDescription);

            console.log("recruiter id", recruiter_id);

            const [addedJob] = await connection.query<ResultSetHeader>('INSERT INTO jobOffers (recruiter_id,remote,organizationName,jobOffer_role,jobOffer_description,country,city) VALUES (?,?,?,?,?,?,?)', [recruiter_id, addingJob.values.Remote, addingJob.values.orgName, addingJob.values.jobRole, addingJob.values.jobDescription, addingJob.values.Country, addingJob.values.City]);
            addingJob.jobOffer_id = addedJob.insertId;
            console.log("ADDINDD", addingJob);

            if (addingJob.tagDescription.length > 1) {
                for (const val of addingJob.tagDescription) {
                    console.log("val", val);


                    await connection.query<ResultSetHeader>(`INSERT INTO jobTags(job_id,description) VALUES(?,?) ;`, [addingJob.jobOffer_id, val]);

                }

            }




        }
        catch (err) {
            console.log("add job offer repo err is", err)
        }

    }



    static async getOneJob(job_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers WHERE jobOffer_id=?`, [job_id]);

        return rows;

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

    static async getJobByRecruiter(recruiter_id: number) {
        console.log("RECRUITER ID", recruiter_id);

        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers WHERE recruiter_id=?`, [recruiter_id]);

        return rows;

    }

    static async getAVGjobRoleOffer() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT jobOffer_role,CAST(100*count(*)  / 
        (SELECT count(*) from jobOffers)AS DECIMAL(4,2))   AS pourcentage  FROM jobOffers group by jobOffer_role;`);

        return rows;

    }

    static async getJobsOfferPerThisYear() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT updatedAt AS date, count(*) 
        FROM jobOffers
        WHERE updatedAt BETWEEN NOW()-INTERVAL 1 YEAR  AND CURRENT_DATE
        GROUP BY date`);

        return rows;

    }

    static async getNonUpdatedJob() {
        const [rows] = await connection.query<RowDataPacket[]>(`    SELECT *
        FROM jobOffers
        WHERE updatedAt  NOT BETWEEN NOW()-INTERVAL 1 YEAR  AND CURRENT_DATE`);

        return rows;

    }

}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */