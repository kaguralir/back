import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { Uploads } from '../entity/uploads_entity';

const storage = multer.diskStorage({
    async destination(req, file, cb) {
        const uploadFolder = __dirname + '/../public/uploads';
        cb(null, uploadFolder);
    },
    filename(req, file, cb) {
        cb(null, randomUUID() + path.extname(file.originalname))

    }
});

export const uploader = multer({ storage });
export const cpUpload = uploader.fields([{ name: 'imageFileName', maxCount: 10 }, { name: 'pdfFileName', maxCount: 10 }])

export async function createThumbnail(file: any, width = 200, height = 200) {
    const thumbnailFolder = __dirname + '/../public/uploads/thumbnails/';
    let images: Uploads[] = []

    console.log('file for sharp page is', file);
    for (const val of file) {
        console.log("val is", val)
        console.log("val filename is is", val.filename)
        console.log("val path is is", val.path)


        await sharp(val.path)
            .resize(width, height, { fit: 'contain' })
            .toFile(thumbnailFolder + val.filename)

        /*         let image = new Image();
                image.fileName = val.filename;
                images.push(image);
                console.log(image)
         */
    }

    return images;
    /* const input =  Buffer.from(file); // or Uint8ClampedArray
    console.log(input); */
    /* 
        await sharp(val )
            .resize(width, height, {fit:'contain'})
            .toFile(thumbnailFolder+file.filename) */
}
