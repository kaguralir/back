import { ResultSetHeader, RowDataPacket } from "mysql2";
import { JobOffers } from "../../entity/recruiter/jobOffers_entity";
import { User } from "../../entity/user_entity";

import { connection } from "../connection";


export class jobOffers_repository {

    /**
     * @returns {Promise<jobOffer[]>} 
     */



    static async  getAllJobOffers() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM jobOffers`);
    

        return rows.map(row => new JobOffers({jobOffer_id : row['jobOffer_id'],recruiter_id : row['recruiter_id'],available : row['available'],organizationName:row['organizationName'],jobProject_id: row['jobProject_id'],jobOffer_role: row['jobOffer_role'],jobOffer_description: row['jobOffer_description'],createdAt: row['createdAt'],updatedAt: row['updatedAt']}
        ));
    
    }

    

    static async addJob(addingJob:JobOffers, userWhoAdds) {
        try{
        const [addedJob] = await connection.query<ResultSetHeader>('INSERT INTO user jobOffer_id,recruiter_id,available,organizationName,jobProject_id,jobOffer_role,jobOffer_description,createdAt) VALUES (?,?,?,?,?,?,?,?)', [addingJob.jobOffer_id,userWhoAdds.user_id,addingJob.available,addingJob.organizationName,userWhoAdds.projectId,addingJob.jobOffer_role,addingJob.jobOffer_description,addingJob.createdAt]);
        addingJob.jobOffer_id = addedJob.insertId;
    }
        catch(err){
            console.log("add job offer repo err is", err)
        }

    }
}


/* const [rows] = await connection.query('SELECT * FROM user WHERE CONCAT(name) LIKE ?', ['%'+term+'%'])
 */