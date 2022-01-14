
import Joi from 'joi';
export class User {


  public user_id: number;
  public demo: number;
  public role: string;
  public name: string;
  public email: string;
  public password: string;
  public updatedAt: Date;

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
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
})

