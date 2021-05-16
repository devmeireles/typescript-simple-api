import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import path from 'path';
import { consts } from './constants';

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageType = {
    s3: multerS3({
        s3: new AWS.S3(),
        bucket: consts.AWS.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
}

export const config = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageType['s3'],
    limits: {
        fileSize: MAX_SIZE_TWO_MEGABYTES,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },
};