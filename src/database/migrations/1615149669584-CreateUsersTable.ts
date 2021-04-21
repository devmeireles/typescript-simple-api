import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1615149669584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
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
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "language",
            type: "varchar",
            default: "'en'",
          },
          {
            name: "account_type",
            type: "varchar",
            default: "'FREE'",
          },
          {
            name: "active",
            type: "boolean",
            default: false,
          },
          {
            name: "activation",
            type: "uuid",
            isUnique: true,
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
    await queryRunner.dropTable("user");
  }
}
