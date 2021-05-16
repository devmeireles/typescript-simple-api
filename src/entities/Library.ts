import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("library")
export class Library {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar", { nullable: false })
  public name!: string;

  @Column("varchar")
  public owner_id?: string;

  @Column("varchar")
  public asset_type?: string;

  @Column("bigint")
  public size?: number;

  @Column("boolean", { default: true })
  public active?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  constructor(props: Omit<Library, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
