import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar")
  public name!: string;

  @Column("varchar", { nullable: true })
  public description?: string;

  @Column("varchar")
  public store_id!: string;

  @Column("boolean", { default: true })
  public active?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(props: Omit<Product, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
