import { S3Provider } from "@repositories/implementations/S3Provider";
import { PostgresLibraryRepository } from "@repositories/implementations/PostgresLibraryRepository";
import { UploadFileUseCase } from "./UploadFileUseCase";
import { UploadFileController } from "./UploadFileController";

const s3Provider = new S3Provider();
const libraryRepository = new PostgresLibraryRepository();

const uploadFIleUseCase = new UploadFileUseCase(
    s3Provider,
    libraryRepository
);

const uploadFileController = new UploadFileController(uploadFIleUseCase);

export { uploadFIleUseCase, uploadFileController };
