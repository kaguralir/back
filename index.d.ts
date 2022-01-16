import { User as Use } from "./src/entity/user_entity";

declare global {
    namespace Express {
        interface User extends Use {

        }
    }
    export interface Request {
        body: any // Actually should be something like `multer.Body`
        files: any // Actually should be something like `multer.Files`
        file: {
            filename: string;
        }
    }
    interface MulterRequest extends Request {
        file: any;
        files: any
    }
}

declare module 'express' {
    interface Request {
        body: any // Actually should be something like `multer.Body`
        files: any // Actually should be something like `multer.Files`
    }
}

interface MulterRequest extends Request {
    file: any;
}

