import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1702078874971 implements MigrationInterface {
    name = 'migration1702078874971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "backoffice_users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_6345143c04620f30df16b692a98" UNIQUE ("email"), CONSTRAINT "PK_6075cc32fd49f6b2d233cbbf6be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "backoffice_users"`);
    }

}
