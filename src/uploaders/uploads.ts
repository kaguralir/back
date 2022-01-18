import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { Uploads } from '../entity/uploads_entity';
const fs = require("fs");
const got = require("got");
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
    console.log("image", img);

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


export async function uploadPdf(file: any, width = 200, height = 200) {
    const thumbnailFolder = __dirname + '/../../public/thumbnails/';

    let imagesFile = file;
    console.log("FILE", file);


    let images: Uploads[] = [];

    for (const val of imagesFile) {

        await sharp(val.path)
            .resize(width, height, { fit: 'contain' })
            .toFile(thumbnailFolder + val.filename);


        let image = new Uploads(val);
        image.fileName = val.filename;
        images.push(image);

    }


    return images;

}
