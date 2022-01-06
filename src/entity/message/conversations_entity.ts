
export class Conversations {


    public conversation_id: number;
    public mutualThumbsUp_id: number;
    public recruiterMessaging_id: number;
    public candidateMessaging_id: number;
    public messageSend: string;
    public sendDate: Date;

    constructor(params){
        Object.assign(this,params);
      }


}


