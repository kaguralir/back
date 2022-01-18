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
    /*    console.log("base PDF", base64); */
    const uploadPdfFolder = __dirname + '/../../public/uploads/pdfs/'
    const uriPDF = base64.split(';base64,').pop()
    const buffer = Buffer.from(uriPDF, 'base64url');
    const namePdf = randomUUID() + '.pdf';
    fs.writeFileSync(__dirname + '/../../public/pdfs/' + namePdf, buffer, 'binary'); //works but is meant to return undefined


    const dirents = fs.readdirSync(__dirname + '/../../public/pdfs/', { withFileTypes: true });
    const filesNames = dirents
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
    console.log("filesNlaes", filesNames);
    for (var i = 0; i < filesNames.length; i++) {
        if (filesNames[i] === namePdf) {
            console.log("LISTE", filesNames[i]); //print the file
            return
        }
    }

    console.log("ONE FILE", filesNames);

    fs.readdir(__dirname + '/../../public/pdfs/' + namePdf,
        // callback function that is called when reading file is done
        function (err, data) {

            let newPdf: Uploads[] = []
            let pdfPersist = new Uploads(data.path.extname);
            pdfPersist.pdfFileName = data;
            newPdf.push(pdfPersist);
            console.log(pdfPersist)
            if (err) throw err;
            // data is a buffer containing file content
            console.log("date is ", data.path.extname)
            return newPdf
        });


    /*    const getPdfCreated = namePdf
       console.log("get pdf created", getPdfCreated);
   
       let newPdf: Uploads[] = []
       let pdfPersist = new Uploads(getPdfCreated);
       pdfPersist.pdfFileName = namePdf;
       newPdf.push(pdfPersist);
       console.log(pdfPersist)
   
   
       console.log("PERSIST PDF", pdfPersist.pdfFileName);
   
      */






}
