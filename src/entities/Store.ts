import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("store")
export class Store {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar")
  public name!: string;

  @Column("varchar", { unique: true, nullable: false })
  public slug!: string;

  @Column("varchar", { nullable: true })
  public description?: string;

  @Column("varchar")
  public owner_id!: string;

  @Column("boolean", { default: true })
  public active?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(props: Omit<Store, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
