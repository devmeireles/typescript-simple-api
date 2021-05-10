import { consts } from "@config/constants";
import { IUserMessageQueue } from "@src/interfaces/IUserMessageQueue";
import aws, { AWSError } from "aws-sdk";
import { SendMessageResult } from "aws-sdk/clients/sqs";
import { PromiseResult } from "aws-sdk/lib/request";
import { ISQSRepository } from "../ISQSRepository";

export class SQSProvider implements ISQSRepository {
  async sendMessage(
    message: IUserMessageQueue,
    type: string
  ): Promise<PromiseResult<SendMessageResult, AWSError>> {
    aws.config.update({ region: consts.AWS.REGION });
    const sqs = new aws.SQS({ apiVersion: consts.AWS.API_VERSION });

    message.message_type = type;

    const params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: consts.QUEUES.EMAIL,
    };

    try {
      return sqs.sendMessage(params).promise();
    } catch (error) {
      console.log(error);
    }
  }
}
