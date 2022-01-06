
export class Interest {

    public interest_id :number;
    public jobApplied_id : number;
    public candidateWhoApplied_id: number;
    public recruiterJobOffer_id:number;
    public interest  : number;

    constructor(params) {
        Object.assign(this, params);
    }
}




/* interest_id
jobApplied_id
candidateWhoApplied_id
recruiterJobOffer_id
interest  
 */