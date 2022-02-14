import Joi from "joi";
import { JobOffers } from "./jobOffers_entity";



export class jobTags {


    public jobTags_id: number;
    public job_id: number;
    public description: string;
    public job: JobOffers;

    constructor(params) {
        Object.assign(this, params);
    }

}


