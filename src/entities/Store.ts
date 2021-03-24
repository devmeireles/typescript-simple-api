import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("store")
export class Store {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar")
  public name!: string;

  @Column("varchar", { nullable: true })
  public description?: string;

  @Column("varchar")
  public owner_id!: string;

  @Column("boolean", { default: true })
  public active?: boolean;

  constructor(props: Omit<Store, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
