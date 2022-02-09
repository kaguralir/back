import Joi from "joi";
import { User } from "../user_entity";

export class jobOffer {


  public jobOffer_id: number;
  public recruiter_id: number;
  public available: number;
  public remote: number;
  public organizationName: string;
  public jobOffer_role: string;
  public jobOffer_description: string;
  public country: string;
  public city: string;
  public updatedAt: Date;
  public user: User;


  constructor(params) {
    Object.assign(this, params);
  }

}


export const jobOfferSchema = Joi.object({
  jobOffer_role: Joi.string().min(4).required(),
  jobOffer_description: Joi.string().min(4).required(),
})
