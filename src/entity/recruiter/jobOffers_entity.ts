
export class JobOffers {

  public jobOffer_id: number;
  public recruiter_id: number;
  public available: number;
  public remote: string;
  public organizationName: string;
  public jobOffer_role: string;
  public jobOffer_description: string;
  public country: string;
  public city: string;
  public updatedAt: Date;

  constructor(params) {
    Object.assign(this, params);
  }


}


/* jobOffer_id 
recruiter_id 
available
organizationName 
jobProject_id 
jobOffer_role 
jobOffer_description 
createdAt 
updatedAt  */
