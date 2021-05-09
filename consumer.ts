import aws from 'aws-sdk';
import { CreateAccountConsumer } from './src/consumers/CreateAccountConsumer';
import { MailtrapMailProvider } from "./src/repositories/implementations/MailtrapMailProvider";
import { Consumer } from 'sqs-consumer';



aws.config.update({ region: 'us-east-1' });
const queueUrl = `http://localhost:4566/000000000000/createAccount`;

const mailtrapMailProvider = new MailtrapMailProvider();
const createAccountConsumer = new CreateAccountConsumer(mailtrapMailProvider);

const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
        const newUser = JSON.parse(message.Body)
        createAccountConsumer.execute(newUser);
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