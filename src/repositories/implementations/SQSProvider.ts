import aws, { AWSError, Request } from "aws-sdk";
import { SendMessageResult } from "aws-sdk/clients/sqs";
import { ISQSRepository } from "../ISQSRepository";

export class SQSProvider implements ISQSRepository {
  async sendMessage(message: any, type: string): Promise<any> {
    aws.config.update({ region: "us-east-1" });
    const sqs = new aws.SQS({ apiVersion: "2012-11-05" });

    message.message_type = type;

    const params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: `http://localhost:4566/000000000000/createAccount`,
    };

    try {
      return sqs.sendMessage(params).promise();
    } catch (error) {
      console.log(error);
    }
  }
}
