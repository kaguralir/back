import { ResultSetHeader, RowDataPacket } from "mysql2";
import { jobOffer } from "../../entity/jobs/jobOffer_entity";
import { JobOffers } from "../../entity/recruiter/jobOffers_entity";
import { jobTags } from "../../entity/recruiter/tagsEntity";
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


    static async getJobsTest(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(` SELECT * FROM jobOffers JOIN user ON recruiter_id=user_id  LEFT OUTER JOIN interest ON jobOffers.jobOffer_id=interest.jobApplied_id WHERE jobApplied_id IS NULL OR recruiterJobOffer_id IS NOT NULL AND interest IS NULL AND candidateWhoApplied_id=?`, [user_id]);

        return rows;

    }
    static async getJobsTestPerJob(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers  INNER JOIN searchedJob ON jobOffer_role=job_title JOIN user ON recruiter_id=user_id LEFT OUTER JOIN interest ON jobOffers.jobOffer_id=interest.jobApplied_id WHERE jobApplied_id IS NULL OR recruiterJobOffer_id IS NOT NULL AND interest IS NULL AND candidateWhoApplied_id=?`, [user_id]);

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


        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers WHERE recruiter_id=?`, [recruiter_id]);

        return rows.map(row => new jobOffer({
            jobOffer_id: row['jobOffer_id'], recruiter_id: row['recruiter_id:'], available: row['available'], remote: row['remote'], organizationName: row['organizationName'], jobOffer_role: row['jobOffer_role'], jobOffer_description: row['jobOffer_description'], country: row['country'], city: row['city'], updatedAt: row['updatedAt']
        }));

    }

    static async getJobById(job_id: number) {
        console.log("job_id ID", job_id);

        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers WHERE jobOffer_id=?`, [job_id]);
        if (rows.length === 1) {
            return rows.map(row => new jobOffer({
                jobOffer_id: rows[0].jobOffer_id, recruiter_id: rows[0].recruiter_id, available: rows[0].available, remote: rows[0].remote, organizationName: rows[0].organizationName, jobOffer_role: rows[0].jobOffer_role, jobOffer_description: rows[0].jobOffer_description, country: rows[0].country, city: rows[0].city, updatedAt: rows[0].updatedAt
            }));
        }

        return null;

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

    static async updateJobOffer(job_id: number, updateSearch) {
        try {


            console.log("updatedSZAERCH", updateSearch);
            

            const myDate = new Date(updateSearch.date);

            if (updateSearch.values == null) {
                return console.log('Error2');
            }

            let available=1;

            if(updateSearch.values.Available==false){
                available=0
            }
            const [row1] = await connection.query<ResultSetHeader>(`UPDATE jobOffers SET available= COALESCE(?,available), remote= COALESCE(?, remote), organizationName=COALESCE(?, organizationName),jobOffer_role= COALESCE(?,jobOffer_role), jobOffer_description= COALESCE(?,jobOffer_description), country= COALESCE(?,country), city= COALESCE(?,city) WHERE jobOffer_id=?`, [available, updateSearch.values.Remote, updateSearch.values.orgName, updateSearch.values.jobRole, updateSearch.values.jobDescription, updateSearch.values.Country, updateSearch.values.City, job_id]);


            // if (updateSearch.tags.length > 0) {

            //     updateSearch.tags.map(async (item) =>

            //         await connection.query<ResultSetHeader>('INSERT INTO jobTags  (job_id, description) VALUES (?,?)', [job_id, item])

            //     )

            //     const [test2] = await connection.query<ResultSetHeader>(`SELECT * FROM jobTags  WHERE job_id=?`, [job_id]);
            //     const [test3] = await connection.query<ResultSetHeader>(`SELECT * FROM jobTags`, [job_id]);

            //     console.log("TEST", test2);
            //     console.log("TEST", test3);

            //     // for (let i = 0; i < updateSearch.tags.length; i++) {
            //     //     console.log("I", i);

            //     // }
            //     // for (let oneTag of updateSearch.tags) {
            //     //     console.log("JOB ID", job_id);
            //     //     console.log("oneTag", oneTag);


            //     //     /*                     const [test] = await connection.query<ResultSetHeader>(`INSERT INTO jobTags  (job_id, description) VALUES (?,?)`, [job_id, oneTag]);
            //     //      */                    /*    updateSearch.jobTags_id = test.insertId; */


            //     //     return;

            //     // }


            // }

        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }

    static async deleteTag(job_id: number) {
        try {
            await connection.query('DELETE FROM jobTags WHERE job_id=?', [job_id]);
        }
        catch (err) {
            console.log("delete tag is", err)
        }

    }

    static async deleteSpecificTag(description: string) {
        try {
            await connection.query('DELETE FROM jobTags WHERE description=? AND job_id=? ', [description]);
        }
        catch (err) {
            console.log("delete tag is", err)
        }

    }

    static async addTag(job_id: number, tag: any) {

        try {


            const [addedTag] = await connection.query<ResultSetHeader>('INSERT INTO jobTags (job_id, description) VALUES (?,?)', [job_id, tag]);




        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }



}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */