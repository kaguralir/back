import { User } from "./user_entity";

export class Uploads {


    public upload_id: number;
    public user: User;
    public userUploader_id: number;
    public fileName: string;
    public pdfFileName: string;
    public jobOffer_id: number;




    constructor(params) {
        Object.assign(this, params);
    }
    get url(): string { return '/uploads/' + this.fileName }
    get thumbnail(): string { return '/uploads/thumbnails/' + this.fileName }

    toJSON() { return { ...this, url: this.url, thumbnail: this.thumbnail } }



}


