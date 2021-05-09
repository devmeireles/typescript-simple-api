import aws, { AWSError, Request } from "aws-sdk";
import { SendMessageResult } from "aws-sdk/clients/sqs";
import { ISQSRepository } from "../ISQSRepository";

export class SQSProvider implements ISQSRepository {
  async sendMessage(message: unknown): Promise<any> {
    aws.config.update({ region: "us-east-1" });
    const sqs = new aws.SQS({ apiVersion: "2012-11-05" });
    const params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: `http://localhost:4566/000000000000/createAccount`,
    };

    try {
      // return new Promise(resolve => {
      //     sqs.sendMessage(params, (err, data) => {
      //         if (err) {
      //             console.log(err);
      //             resolve(err);
      //         } else {
      //             console.log(err);
      //             console.log(data);
      //             resolve(data);
      //         }
      //     });
      // });

      return sqs.sendMessage(params).promise();
    } catch (error) {
      console.log(error);
    }
  }
}
