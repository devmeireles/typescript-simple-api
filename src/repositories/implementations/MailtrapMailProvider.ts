import { IMailRepository, IMessage } from "../IMailRepository";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { User } from "@entities/User";

interface IMailConfig {
  name: string;
  email: string;
  subject?: string;
  template?: string;
  data: User;
}

export class MailtrapMailProvider implements IMailRepository {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ab9923e8f2fbb7",
        pass: "c667f912b0b652",
      },
    });
  }

  async sendCreateAccountMail(message: IMessage, data: User): Promise<void> {
    const type = "CREATE_ACCOUNT";
    const typeConfig = this.getConfigType(type, data);
    const template = this.loadHTMLTemplate(
      typeConfig.template,
      typeConfig.data,
      type
    );

    return await this.sendMail(typeConfig, message, template);
  }

  async sendResetPasswordMail(message: IMessage, data: User): Promise<void> {
    const type = "RESET_PASSWORD";
    const typeConfig = this.getConfigType(type, data);
    const template = this.loadHTMLTemplate(
      typeConfig.template,
      typeConfig.data,
      type
    );

    return await this.sendMail(typeConfig, message, template);
  }

  async sendMail(
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
          subject: `Ownshop - Welcome ${data.name}`,
          template: "create_account.html",
          data,
        };
        break;
      case "RESET_PASSWORD":
        config = {
          name: process.env.APP_NAME,
          email: process.env.APP_MAIL_MAIN,
          subject: `Ownshop - Reset Password`,
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
