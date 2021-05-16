import { consts } from "../../config/constants";
import { IS3Repository } from "../IS3Repository";
import { File } from '@interfaces/IFile';
import { S3 } from "aws-sdk";

export class S3Provider implements IS3Repository {
    private generateFileKey(file: string, owner: string): string {
        return `${owner}/${file}`;
    }

    async uploadFile(file: File, owner: string): Promise<File> {
        const bucketName = consts.AWS.BUCKET_NAME;

        const client = new S3({
            region: consts.AWS.REGION,
            apiVersion: consts.AWS.API_VERSION,
            endpoint: consts.AWS.BUCKET_ADDRESS,
            credentials: {
                accessKeyId: consts.AWS.ACCESS_KEY,
                secretAccessKey: consts.AWS.SECRET_KEY
            },
            s3ForcePathStyle: true
        });

        let fileName = file.name.split('.').shift();
        const timestamp: number = Date.now();
        fileName = `${fileName}-${timestamp}.${file.extension}`;

        const fileKey = this.generateFileKey(fileName, owner);

        try {
            await client.upload({
                Bucket: bucketName,
                Key: fileKey,
                ContentType: file.type,
                Body: file.content
            }).promise();

            file.name = fileName;
            file.content = null;
            file.owner_id = owner;

            return file;
        } catch (error) {
            console.log(error);
        }

    }
}
