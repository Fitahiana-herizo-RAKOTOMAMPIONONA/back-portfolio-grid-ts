import { Request } from "express";
import { Multer } from "multer";

declare global {
    namespace Express {
        interface Request {
            file?: Multer.File;
        }
    }
}
