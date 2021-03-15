import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { uuid } from "uuidv4";
import bcrypt from 'bcryptjs';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar")
  public name!: string;

  @Column("varchar")
  public email!: string;

  @Column("varchar", { select: false })
  public password!: string;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
