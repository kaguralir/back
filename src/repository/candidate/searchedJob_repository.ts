
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
        console.log("added", addingSearch);
        console.log("added", addingSearch.selectedCity);
        try {
            const [addedSearch] = await connection.query<ResultSetHeader>('INSERT INTO searchedJob (candidat_id,remote, beginDate, city, country,  car_ownership, job_title, description,skill1,skill2,skill3, softSkill1, softSkill2,softSkill3,hobby1,hobby2,hobby3) VALUES (?,?,?, ?,?,?, ?,?,? ,?,?,? ,?,?,? ,?,?)', [candidatSkills_id, addingSearch.remote, addingSearch.beginDate, addingSearch.selectedCity, addingSearch.selectedCountry, addingSearch.car_owernship, addingSearch.job_title, addingSearch.description, addingSearch.skill1, addingSearch.skill2, addingSearch.skill3, addingSearch.softSkill1, addingSearch.softSkill2, addingSearch.softSkill3, addingSearch.hobby1, addingSearch.hobby2, addingSearch.hobby3]);
            addingSearch.searchedJob_id = addedSearch.insertId;
            console.log("adding search", addingSearch);



        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }

    static async updateSearch(candidat_id: number, jobSearch_id: number, updateSearch) {
        try {

            const [row2] = await connection.query<ResultSetHeader>(`UPDATE  skillsCandidate SET skill1=?, skill2=?, skill3=?, skill4=?, skill5=?, softSkill1=?, softSkill2=?, softSkill3=?, hobby1=?, hobby2=?, hobby3=? WHERE candidatSkills_id=?  `, [updateSearch.skill1, updateSearch.skill2, updateSearch.skill3, updateSearch.skill4, updateSearch.skill5, updateSearch.softSkill1, updateSearch.softSkill2, updateSearch.softSkill3, updateSearch.hobby1, updateSearch.hobby2, updateSearch.hobby3, candidat_id]);

            const [row1] = await connection.query<ResultSetHeader>(`UPDATE searchedJob SET remote=?, beginDate=?, city=?, country=?,  car_ownership=?, job_title=?, description=?, projects=? WHERE searchedJob_id=?`, [updateSearch.remote, updateSearch.beginDate, updateSearch.city, updateSearch.country, updateSearch.car_owernship, updateSearch.job_title, updateSearch.description, updateSearch.projects, jobSearch_id]);
            console.log("row1", row1);
            console.log("row2", row2);



        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }




    static async getSearchedJobByCandidate(candidate_id: number) {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM searchedJob INNER JOIN skillsCandidate ON candidat_id=candidatSkills_id WHERE candidat_id=?`, [candidate_id]);
        console.log("rows search by candidate", candidate_id);

        return rows;

    }



    static async getAVGsearchedJob() {
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT jobOffer_role,CAST(100*count(*)  / 
        (SELECT count(*) from jobOffers)AS DECIMAL(4,2))   AS pourcentage  FROM jobOffers group by jobOffer_role;`);

        return rows;

    }



}

