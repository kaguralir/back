
export  class User {

    /**
     * 
     * @param {string} user_id 
     * @param {number} demo
     * @param {string} role
     * @param {number} organizationId 
     * @param {number} projectId
     * @param {string} name 
     * @param {string} email
     * @param {string} password 
     * @param {number} mobile 
     * @param {date} createAt 
    * @param {date} updatedAt 



     */
    constructor(public  user_id:string, public demo : string, public role: string, public  organizationId: number, public projectId:number, public name : string,  public email : string, public password : string, public mobile: number, public createdAt : Date, public updatedAt : Date) {
        
    }
}


/* this.demo = demo;
        this.role = role;
        this.organizationId = organizationId;
        this.projectId = projectId;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt */