export class skillsEntity {


    public skills_id: number;
    public jobSkills_id: number;
    public candidatSkills_id: number;
    public skills: string;
    public softSkills: string;
    public hobbies: string;



    constructor(params) {
        Object.assign(this, params);
    }

}