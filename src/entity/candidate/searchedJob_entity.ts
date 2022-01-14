
export class SearchedJob {


  public searchedJob_id: number;
  public candidat_id: number;
  public available: number;
  public everywhere: number;
  public remote: number;
  public beginDate: Date;
  public city: string;
  public region: string;
  public mobile: string;
  public job: string;
  public category: string;
  public description: string;
  public portfolio: string;
  public updatedAt: Date;


  constructor(params) {
    Object.assign(this, params);
  }


}
