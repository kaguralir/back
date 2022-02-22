import { ResultSetHeader, RowDataPacket } from "mysql2";
import { jobTags } from "../entity/recruiter/tagsEntity";
import { Uploads } from "../entity/uploads_entity";
import { User } from "../entity/user_entity";
import { connection } from "./connection";
import { user_repository } from "./user_repository";


export class uploads_repository {





    static async findJobPerId(job_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM interest JOIN jobOffers ON jobApplied_id = jobOffer_id JOIN uploads ON jobOffers.recruiter_id= userUploader_id JOIN user ON jobOffers.recruiter_id=user_id WHERE jobOffers.jobOffer_id =?", [job_id]);
        /* console.log("job_id uploads_repository", job_id);
        console.log("rows uploads_repository", rows); */



        return rows;
    }

    static async candidateFindUploadsPerUser(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM uploads JOIN  jobOffers ON userUploader_id= recruiter_id WHERE jobOffers.jobOffer_id =?", [user_id]);
        /*    console.log("user", user_id);
           console.log("rows", rows); */

        return rows.map(row => new Uploads({ userUploader_id: row['userUploader_id'], fileName: row['fileName'], pdfFileName: row['pdfFileName'] }));

    }
    static async findUploadsPerUser(user_id: number, withPerson = false) {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM uploads WHERE userUploader_id=?", [user_id]);
        /*    console.log("user", user_id);
           console.log("rows", rows); */

        return rows.map(row => new Uploads({ uploads_id: row['uploads_id'], userUploader_id: row['userUploader_id'], fileName: row['fileName'], pdfFileName: row['pdfFileName'] }));

    }

    static async findRecruiterPerJob(job_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM jobOffers JOIN interest ON jobOffer_id=jobApplied_id JOIN user ON recruiter_id=user_id  WHERE jobOffers.jobOffer_id=?", [job_id]);
        /*    console.log("user", user_id);
           console.log("rows", rows); */

        return rows;

    }



    static async findTagsPerJobs(job_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM jobTags WHERE job_id=?", [job_id]);


        return rows.map(row => new jobTags({ jobTags_id: row['jobTags_id'], job_id: row['job_id'], description: row['description'] }));
        console.log("rows", rows);

    }
    static async getSearchedJob(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM searchedJob WHERE candidat_id=?', [user_id]);

        return rows;

    }
    static async getSkillsForSearchedJob(user_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM skills WHERE candidatSkills_id=?', [user_id]);

        return rows;

    }


}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */