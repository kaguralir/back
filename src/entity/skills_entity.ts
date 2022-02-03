import { User } from "./user_entity";

export class skillsEntity {


    public skills_id: number;
    public jobSkills_id: number;
    public candidatSkills_id: number;
    public skill1: string;
    public skill2: string;
    public skill3: string;
    public skill4: string;
    public skill5: string;
    public softSkill1: string;
    public softSkill2: string;
    public softSkill3: string;
    public hobby1: string;
    public hobby2: string;
    public hobby3: string;
    public user: User;



    constructor(params) {
        Object.assign(this, params);
    }

}