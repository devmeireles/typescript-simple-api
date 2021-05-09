export interface ISQSRepository {
  sendMessage(message: unknown, type: string): Promise<any>;
}
