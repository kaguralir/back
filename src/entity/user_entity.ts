
export class User {


    public user_id: number;
    public demo: string;
    public role: string;
    public organizationId: number;
    public projectId: number;
    public name: string;
    public email: string;
    public password: string;
    public mobile: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(params){
        Object.assign(this,params);
      }


}


