
export class SearchedJob {


    public searchedJob_id: number;
    public candidat_id: number;
    public available: number;
    public remote: number;
    public beginDate : Date;
    public locations: string;
    public job: string;
    public category: string;
    public createdAt: Date;
    

    constructor(params){
        Object.assign(this,params);
      }


}
