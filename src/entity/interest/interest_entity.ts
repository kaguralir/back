import { jobOffer } from "../jobs/jobOffer_entity";
import { Uploads } from "../uploads_entity";

export class Interest {

    public images: Uploads[] = [];
    public pdfs: Uploads;
    public job: jobOffer;
    constructor(public interest_id: number, public jobApplied_id: number, public candidateWhoApplied_id: number, public recruiterJobOffer_id: number, public interest: number) {

    }
}

/* export class Interest {
    interest_id: number;
    jobApplied_id: number;
    candidateWhoApplied_id: number;
    recruiterJobOffer_id: number;
    interest: number;
    constructor(interest_id: number, jobApplied_id: number, candidateWhoApplied_id: number, recruiterJobOffer_id: number, interest: number) {
        this.interest_id = interest_id;
        this.jobApplied_id = jobApplied_id;
        this.candidateWhoApplied_id = candidateWhoApplied_id;
        this.recruiterJobOffer_id = recruiterJobOffer_id;
        this.interest = interest;
    }

} */

/* export class Interest {

    public interest_id :number;
    public jobApplied_id : number;
    public candidateWhoApplied_id: number;
    public recruiterJobOffer_id:number;
    public interest  : number;

    constructor(params) {
        Object.assign(this, params);
    }
}
 */




/* interest_id
jobApplied_id
candidateWhoApplied_id
recruiterJobOffer_id
interest  
 */