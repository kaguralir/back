
export class Conversations {


  public conversation_id: number;
  public mutualInterest_id: number;
  public sender_id: number;
  public sendDate: Date;

  constructor(params) {
    Object.assign(this, params);
  }


}


