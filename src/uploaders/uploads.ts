import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { Uploads } from '../entity/uploads_entity';

const storage = multer.diskStorage({
    async destination(req, file, cb) {
        const uploadFolder = __dirname + '/../../public/uploads';
        console.log("uplaoder folder", uploadFolder);

        cb(null, uploadFolder);
    },
    filename(req, file, cb) {
        cb(null, randomUUID() + path.extname(file.originalname))

    }
});

export const uploader = multer({ storage });
export const cpUpload = uploader.fields([{ name: 'imageFileName', maxCount: 10 }, { name: 'pdfFileName', maxCount: 10 }])
/* 
export async function createThumbnail(file: Express.Multer.File, width = 200, height = 200) {
    const thumbnailFolder = __dirname + '/../../public/uploads/thumbnails';
    console.log("folder direction", thumbnailFolder);


    await sharp(file.path)
        .resize(width, height, { fit: 'contain' })
        .toFile(thumbnailFolder + file.filename)
}

 */