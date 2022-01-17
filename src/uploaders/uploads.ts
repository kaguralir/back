import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { Uploads } from '../entity/uploads_entity';


export async function uploadImage(base64: string) {

    const baseImage = randomUUID() + '.jpg';
    const buffer = Buffer.from(base64, 'base64');

    const img = sharp(buffer)
        .jpeg({ quality: 70 });
    await Promise.all([
        img.toFile(__dirname + '/../../public/uploads/' + baseImage),
        img.resize(200, 200).toFile(__dirname + '/../../public/uploads/thumbnails/' + baseImage)
    ]);

    // for (const img of baseImage) {
    //         await Promise.all([
    //         img.toFormat(randomUUID() + '.jpg'),
    //         img.toBuffer(base64, 'base64'),     
    //         img.toFile(__dirname + '/../../public/uploads/' + filename),
    //         img.resize(200, 200).toFile(__dirname + '/../../public/uploads/thumbnails/' + filename)
    //     ]);
    //     let image = new Uploads(img);
    //     image.fileName = img.filename;
    //     images.push(image);

    // }
    

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
