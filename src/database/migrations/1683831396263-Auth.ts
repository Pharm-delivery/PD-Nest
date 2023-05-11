import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1683831396263 implements MigrationInterface {
  name = 'Auth1683831396263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "phoneNumber" character varying, "otp" character varying, "provider" character varying NOT NULL DEFAULT 'phoneNumber', "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_2e64383bae8871598afb8b73f0d" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2af7646e11a0872eb9a0212545" ON "customer" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b5187e7475dcc88f25bec3967" ON "customer" ("lastName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_70f9b6a4aae05f87d03e771a81e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_f28cf7cf65a7bf745e49686610a" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_f28cf7cf65a7bf745e49686610a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_70f9b6a4aae05f87d03e771a81e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2b5187e7475dcc88f25bec3967"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2af7646e11a0872eb9a0212545"`,
    );
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
