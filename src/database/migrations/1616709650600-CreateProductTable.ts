import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1616709650600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "price",
            type: "decimal",
            isNullable: false,
          },
          {
            name: "store_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "deleted_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("product");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("store_id") !== -1
    );
    await queryRunner.dropForeignKey("product", foreignKey);
    await queryRunner.dropTable("product");
  }
}
