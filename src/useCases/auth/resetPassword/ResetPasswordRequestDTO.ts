export interface IResetPasswordRequestDTO {
  name?: string;
  activation: string;
  email: string;
  password: string;
  readonly hashPassword? ;
}
