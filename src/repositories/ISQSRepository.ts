export interface ISQSRepository {
    sendMessage(message: unknown): Promise<any>;
}
