
import Joi from 'joi';
import { Uploads } from './uploads_entity';
export class User {


  public user_id: number;
  public demo: number;
  public role: string;
  public name: string;
  public email: string;
  public password: string;
  public updatedAt: Date;
  public images: Uploads[] = [];
  public pdfs: Uploads[] = [];


  constructor(params) {
    Object.assign(this, params);
  }
  toJSON() {
    return {
      user_id: this.user_id,
      role: this.role,

    }
  }


}

export const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().required(),

}).options({ allowUnknown: true });

