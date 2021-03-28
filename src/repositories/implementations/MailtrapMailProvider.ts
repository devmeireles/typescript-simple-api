import { IMailRepository, IMessage } from "../IMailRepository";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

interface IMailConfig {
  name: string;
  email: string;
  subject?: string;
  template?: string;
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

  async sendMail(message: IMessage, type: string): Promise<void> {
    const typeConfig = this.getConfigType(type, message["to"]);
    const template = this.loadHTMLTemplate(typeConfig.template, message.to);

    await this.transporter.sendMail({
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

  getConfigType(type: string, receiver: IMessage["to"]): IMailConfig {
    let config: IMailConfig = {
      name: process.env.APP_NAME,
      email: process.env.APP_MAIL_MAIN,
    };

    switch (type) {
      case "CREATE_ACCOUNT":
        config = {
          name: process.env.APP_NAME,
          email: process.env.APP_MAIL_MAIN,
          subject: `Ownshop - Welcome ${receiver.name}`,
          template: "create_account.html",
        };
        break;
      default:
        break;
    }

    return config;
  }

  loadHTMLTemplate(templateFile: string, receiver: IMessage["to"]): string {
    const file = path.join(
      __dirname + "../../../templates/mail/" + templateFile
    );
    const loadedHTML = fs.readFileSync(file, "utf-8").toString();

    const template = handlebars.compile(loadedHTML);

    const replacements = {
      user_name: receiver.name,
    };

    return template(replacements);
  }
}
