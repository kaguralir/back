import { skillsEntity } from "../skills_entity";


export class SearchedJob {


  public searchedJob_id: number;
  public candidat_id: number;
  public available: number;
  public remote: string;
  public beginDate: Date;
  public city: string;
  public country: string;
  public car_ownership: number;
  public job_title: string;
  public description: string;
  public projects: string;
  public updatedAt: Date;
  public candidateSkills: skillsEntity;


  constructor(params) {
    Object.assign(this, params);
  }


}
