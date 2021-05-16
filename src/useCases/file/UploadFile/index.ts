import { S3Provider } from "@repositories/implementations/S3Provider";
import { UploadFileUseCase } from "./UploadFileUseCase";
import { UploadFileController } from "./UploadFileController";


const s3Provider = new S3Provider();

const uploadFIleUseCase = new UploadFileUseCase(s3Provider);
const uploadFileController = new UploadFileController(uploadFIleUseCase);

export { uploadFIleUseCase, uploadFileController };