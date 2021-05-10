import aws from 'aws-sdk';
import { CreateAccountConsumer } from './src/consumers/CreateAccountConsumer';
import { ResetPasswordConsumer } from './src/consumers/ResetPasswordConsumer';
import { MailtrapMailProvider } from "./src/repositories/implementations/MailtrapMailProvider";
import { consts } from './src/config/constants';
import { Consumer } from 'sqs-consumer';



aws.config.update({ region: consts.AWS.REGION });
const queueUrl = consts.QUEUES.EMAIL;

const mailtrapMailProvider = new MailtrapMailProvider();
const createAccountConsumer = new CreateAccountConsumer(mailtrapMailProvider);
const resetPasswordConsumer = new ResetPasswordConsumer(mailtrapMailProvider);

const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
        const data = JSON.parse(message.Body)

        switch (data.message_type) {
            case consts.MODULES.CREATE_ACCOUNT:
                createAccountConsumer.execute(data);
                break;
            case consts.MODULES.UPDATE_ACCOUNT:
                resetPasswordConsumer.execute(data);
                break;
            default:
                break;
        }
    },
    sqs: new aws.SQS()
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

console.log('Emails service is running');
app.start();