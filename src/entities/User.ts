import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { Store } from "./Store";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar")
  public name!: string;

  @Column("varchar", { unique: true })
  public email!: string;

  @Column("varchar")
  public password!: string;

  @Column("varchar", { default: "en" })
  public language?: string;

  @Column("varchar", { default: "FREE" })
  public account_type?: string;

  @Column("boolean", { default: false })
  public active?: boolean;

  @Column("uuid", { nullable: false, unique: true })
  public readonly activation?: string;

  @Column("uuid", { nullable: true, unique: true })
  public current_token?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToOne(() => Store)
  @JoinColumn()
  public store?: Store;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    this.activation = uuid();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async compareHash?(unencryptedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
