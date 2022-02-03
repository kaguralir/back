
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { SearchedJob } from "../../entity/candidate/searchedJob_entity"

import { User } from "../../entity/user_entity";

import { connection } from "../connection";


export class searchedJob_repository {

    /**
     * @returns {Promise<jobOffer[]>} 
     */



    static async getAllSearchedJobs() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM searchedJob`);


        return rows;

    }

    static async getSearchedJobExists(candidat_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM searchedJob WHERE candidat_id=?`, [candidat_id]);

        if (rows.length === 1) {
            return new SearchedJob({
                searchedJob_id: rows[0].searchedJob_id, candidat_id: rows[0].candidat_id
            });
        }
        return null;

    }






    static async addSearch(candidatSkills_id: number, addingSearch) {
        try {
            const [addedSearch] = await connection.query<ResultSetHeader>('INSERT INTO searchedJob (candidat_id,remote, beginDate, city, country,  car_ownership, job_title, description, projects) VALUES (?,?,?,?,?,?,?,?,?)', [candidatSkills_id, addingSearch.remote, addingSearch.beginDate, addingSearch.city, addingSearch.country, addingSearch.car_owernship, addingSearch.job_title, addingSearch.description, addingSearch.projects]);
            addingSearch.searchedJob_id = addedSearch.insertId;
            console.log("adding search", addingSearch);


            await connection.query<ResultSetHeader>(`INSERT INTO   skillsCandidate (candidatSkills_id, skill1,skill2,skill3,skill4,skill5, softSkill1, softSkill2,softSkill3,hobby1,hobby2,hobby3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) `, [candidatSkills_id, addingSearch.candidateSkills.skill1, addingSearch.candidateSkills.skill2, addingSearch.candidateSkills.skill3, addingSearch.candidateSkills.skill4, addingSearch.candidateSkills.skill5, addingSearch.candidateSkills.softSkill1, , addingSearch.candidateSkills.softSkill2, , addingSearch.candidateSkills.softSkill3, addingSearch.candidateSkills.hobby1, addingSearch.candidateSkills.hobby2, addingSearch.candidateSkills.hobby3]);

        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }

    static async updateSearch(candidat_id: number, jobSearch_id: number, updateSearch) {
        try {

            const [row2] = await connection.query<ResultSetHeader>(`UPDATE  skillsCandidate SET skill1=?, skill2=?, skill3=?, skill4=?, skill5=?, softSkill1=?, softSkill2=?, softSkill3=?, hobby1=?, hobby2=?, hobby3=? WHERE candidatSkills_id=?  `, [updateSearch.candidateSkills.skill1, updateSearch.candidateSkills.skill2, updateSearch.candidateSkills.skill3, updateSearch.candidateSkills.skill4, updateSearch.candidateSkills.skill5, updateSearch.candidateSkills.softSkill1, updateSearch.candidateSkills.softSkill2, updateSearch.candidateSkills.softSkill3, updateSearch.candidateSkills.hobby1, updateSearch.candidateSkills.hobby2, updateSearch.candidateSkills.hobby3, candidat_id]);

            const [row1] = await connection.query<ResultSetHeader>(`UPDATE searchedJob SET remote=?, beginDate=?, city=?, country=?,  car_ownership=?, job_title=?, description=?, projects=? WHERE searchedJob_id=?`, [updateSearch.remote, updateSearch.beginDate, updateSearch.city, updateSearch.country, updateSearch.car_owernship, updateSearch.job_title, updateSearch.description, updateSearch.projects, jobSearch_id]);
            console.log("row1", row1);
            console.log("row2", row2);



        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }




    static async getSearchedJobByCandidate(candidate_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM searchedJob INNER JOIN skills ON candidat_id=candidatSkills_id WHERE candidat_id=?`, [candidate_id]);

        return rows;

    }



    static async getAVGsearchedJob() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT jobOffer_role,CAST(100*count(*)  / 
        (SELECT count(*) from jobOffers)AS DECIMAL(4,2))   AS pourcentage  FROM jobOffers group by jobOffer_role;`);

        return rows;

    }



}

