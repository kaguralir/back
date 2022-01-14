export class Uploads {


    public upload_id: number;
    public imageFileName: string;
    public pdfFileName: string;
    public candidate_id: number;
    public jobOffer_id: number;



    constructor(params) {
        Object.assign(this, params);
    }
    get url(): string { return '/uploads/' + this.imageFileName }
    get thumbnail(): string { return '/uploads/thumbnails/' + this.imageFileName }

    toJSON() { return { ...this, url: this.url, thumbnail: this.thumbnail } }



}


