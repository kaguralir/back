import { jobTags } from "./tagsEntity";

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
  public tagDescription: jobTags[] = [];
  constructor(params) {
    Object.assign(this, params);
  }


}

