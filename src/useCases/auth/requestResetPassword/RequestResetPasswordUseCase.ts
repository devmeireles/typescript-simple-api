import { ILoggedUser } from "@src/interfaces/ILoggedUser";
import { IUserRepository } from "@src/repositories/IUserRepository";
import { IRequestPasswordRequestDTO } from "./IRequestPasswordRequestDTO";
import { IMailRepository } from "@src/repositories/IMailRepository";
import { v4 as uuid } from "uuid";

export class RequestResetPasswordUseCase {
    constructor(private userRepository: IUserRepository, private mailRepository: IMailRepository) { }

    async execute(data: IRequestPasswordRequestDTO): Promise<ILoggedUser> {
        const { email } = data;
        const currentUser = await this.userRepository.findByEmail(email);

        if (!currentUser) {
            throw new Error("User not found");
        }

        data.current_token = uuid();
        const user = await this.userRepository.updateOne(currentUser.id, data);

        await this.mailRepository.sendResetPasswordMail(
            {
                to: {
                    name: user.name,
                    email: user.email,
                },
            },
            user
        );

        const loggedUser: ILoggedUser = {
            name: currentUser.name,
            id: currentUser.id,
            email: currentUser.email,
        };

        return loggedUser;
    }
}
