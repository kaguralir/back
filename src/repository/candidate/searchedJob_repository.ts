
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
            addingSearch.skills_id = addedSearch.insertId;

            await connection.query<ResultSetHeader>(`INSERT INTO  skills (candidatSkills_id, skills, softSkills, hobbies) VALUES (?,?,?,?,?) `, [candidatSkills_id, addingSearch.skills, addingSearch.softSkills, addingSearch.hobbies]);

        }
        catch (err) {
            console.log("adduser repo err is", err)
        }

    }

    static async updateSearch(candidatSkills_id: number, jobSearch_id: number, updateSearch) {
        try {
            await connection.query<ResultSetHeader>(`UPDATE searchedJob SET remote=?, beginDate=?, city=?, country=?,  car_ownership=?, job_title=?, description=?, projects=? WHERE searchedJob_id=?`, [updateSearch.remote, updateSearch.beginDate, updateSearch.city, updateSearch.country, updateSearch.car_owernship, updateSearch.job_title, updateSearch.description, updateSearch.projects, jobSearch_id]);
            await connection.query<ResultSetHeader>(`UPDATE  skills (candidatSkills_id, skills, softSkills, hobbies) VALUES (?,?,?,?,?) WHERE candidatSkills_id=?  `, [updateSearch.skills, updateSearch.softSkills, updateSearch.hobbies, candidatSkills_id]);

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

