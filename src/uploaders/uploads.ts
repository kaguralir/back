import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { Uploads } from '../entity/uploads_entity';

const storage = multer.diskStorage({
    async destination(req, file, cb) {
        const uploadFolder = __dirname + '/../../public/';



        cb(null, uploadFolder);
    },
    filename(req, file, cb) {


        cb(null, randomUUID() + path.extname(file.originalname));


    }
});

export const uploader = multer({ storage }).fields([{ name: 'imageFileName' }, { name: 'pdfFileName' }]);
/* export const cpUpload = uploader.fields([{ name: 'imageFileName', maxCount: 10 }, { name: 'pdfFileName', maxCount: 10 }])
 */




export async function createThumbnail(file: any, width = 200, height = 200) {
    const thumbnailFolder = __dirname + '/../../public/thumbnails/';
    /*     console.log("FILE THUMB", file); */

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
        /*    console.log("SHARPED IMAGES", images); */


    }


    return images;

}
