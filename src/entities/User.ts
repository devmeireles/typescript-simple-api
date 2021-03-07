import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { uuid } from "uuidv4";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column("varchar")
  public name: string;

  @Column("varchar")
  public email: string;

  @Column("varchar")
  public password: string;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
