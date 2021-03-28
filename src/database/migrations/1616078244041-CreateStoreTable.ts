import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStoreTable1616078244041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "store",
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
            name: "slug",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "owner_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
        ],
      })
    );

    // await queryRunner.createForeignKey(
    //   "store",
    //   new TableForeignKey({
    //     columnNames: ["owner_id"],
    //     referencedColumnNames: ["id"],
    //     referencedTableName: "user"
    //   })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("store");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("owner_id") !== -1
    );
    await queryRunner.dropForeignKey("store", foreignKey);
    await queryRunner.dropTable("store");
  }
}
