import { AWSError } from "aws-sdk";
import { SendMessageResult } from "aws-sdk/clients/sqs";
import { PromiseResult } from "aws-sdk/lib/request";

export interface ISQSRepository {
  sendMessage(
    message: unknown,
    type: string
  ): Promise<PromiseResult<SendMessageResult, AWSError>>;
}
