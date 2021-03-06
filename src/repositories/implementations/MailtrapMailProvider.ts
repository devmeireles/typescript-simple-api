import { IMailRepository, IMessage } from "../IMailRepository";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { User } from "@entities/User";
import { AWSError, SES } from "aws-sdk";
import { SendEmailRequest, SendEmailResponse } from "aws-sdk/clients/ses";
import env from "dotenv";
import { consts } from "@src/config/constants";

env.config();

interface IMailConfig {
  name: string;
  email: string;
  subject?: string;
  template?: string;
  data: User;
}

export class MailtrapMailProvider implements IMailRepository {
  private transporter: Mail;
  private ses: SES;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: consts.EMAIL.SMTP_ADDRESS,
      port: consts.EMAIL.PORT,
      auth: {
        user: consts.EMAIL.USER,
        pass: consts.EMAIL.PASSWORD,
      },
    });

    this.ses = new SES();
  }

  async sendCreateAccountMail(message: IMessage, data: User): Promise<void> {
    const type = "CREATE_ACCOUNT";
    const typeConfig = this.getConfigType(type, data);
    const template = this.loadHTMLTemplate(
      typeConfig.template,
      typeConfig.data,
      type
    );

    return await this.sendFakeMail(typeConfig, message, template);
  }

  async sendResetPasswordMail(message: IMessage, data: User): Promise<void> {
    const type = "RESET_PASSWORD";
    const typeConfig = this.getConfigType(type, data);
    const template = this.loadHTMLTemplate(
      typeConfig.template,
      typeConfig.data,
      type
    );

    return await this.sendFakeMail(typeConfig, message, template);
  }

  async sendFakeMail(
    typeConfig: IMailConfig,
    message: IMessage,
    template: string
  ): Promise<void> {
    return await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: typeConfig.name,
        address: typeConfig.email,
      },
      subject: typeConfig.subject,
      html: template,
    });
  }

  async sendMail(
    typeConfig: IMailConfig,
    message: IMessage,
    template: string
  ): Promise<void> {
    const params: SendEmailRequest = {
      Source: typeConfig.email,
      Destination: {
        ToAddresses: [message.to.email],
      },
      Message: {
        Subject: {
          Data: typeConfig.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: template,
            Charset: "UTF-8",
          },
        },
      },
    };

    this.ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }

  getConfigType(type: string, data: User): IMailConfig {
    let config: IMailConfig = {
      name: process.env.APP_NAME,
      email: process.env.APP_MAIL_MAIN,
      data,
    };

    switch (type) {
      case "CREATE_ACCOUNT":
        config = {
          name: process.env.APP_NAME,
          email: process.env.APP_MAIL_MAIN,
          subject: `Shop - Welcome ${data.name}`,
          template: "create_account.html",
          data,
        };
        break;
      case "RESET_PASSWORD":
        config = {
          name: process.env.APP_NAME,
          email: process.env.APP_MAIL_MAIN,
          subject: `Shop - Reset Password`,
          template: "reset_password.html",
          data,
        };
        break;
      default:
        break;
    }

    return config;
  }

  loadHTMLTemplate(templateFile: string, data: User, type: string): string {
    const file = path.join(
      __dirname + "../../../templates/mail/" + templateFile
    );
    const loadedHTML = fs.readFileSync(file, "utf-8").toString();

    const template = handlebars.compile(loadedHTML);

    let replacements = {};

    switch (type) {
      case "CREATE_ACCOUNT":
        {
          const activationURL = `localhost:8080/auth/activation/${data.activation}`;

          replacements = {
            user_name: data.name,
            activation_url: activationURL,
          };
        }
        break;
      case "RESET_PASSWORD":
        {
          const resetPasswordURL = `localhost:8080/auth/reset-password/${data.current_token}`;

          replacements = {
            user_name: data.name,
            reset_password_url: resetPasswordURL,
          };
        }
        break;
      default:
        break;
    }

    return template(replacements);
  }
}
