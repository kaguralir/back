import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { Uploads } from '../entity/uploads_entity';
import { Duplex } from 'stream';
const fs = require("fs");
import { dirname } from 'path';

const sharpStream = sharp({
    failOnError: false
});
export async function uploadImage(base64: string) {
    /*   const body = await got(base64).buffer();
      console.log("body", body);
   */
    const baseImage = randomUUID() + '.jpeg';
    const uri = base64.split(';base64,').pop()
    const buffer = Buffer.from(uri, 'base64url');
    const img = sharp(buffer)


    await Promise.all([
        // img.toFormat('png'),
        img.toFile(__dirname + '/../../public/uploads/' + baseImage),
        img.resize(200, 200).toFile(__dirname + '/../../public/uploads/thumbnails/' + baseImage)])
        .then(res => { console.log("Done ===============>!", res); })
        .catch(err => {
            console.error("Error sharp promise", err);
        });
    console.log("base ilage", baseImage);


    return baseImage;
}


export async function uploadPdf(base64: string) {

    const uriPDF = base64.split(';base64,').pop()
    const buffer = Buffer.from(uriPDF, 'base64url');
    const namePdf = randomUUID() + '.pdf';
    await fs.writeFileSync(__dirname + '/../../public/pdfs/' + namePdf, buffer)

    return namePdf;

}
