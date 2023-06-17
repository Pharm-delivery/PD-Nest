import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProducts1687024065973 implements MigrationInterface {
  name = 'AddProducts1687024065973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "logo" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medication" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "logo" character varying NOT NULL, "price" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0682f5b7379fea3c2fdb77d6545" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_category_medications_medication" ("subCategoryId" integer NOT NULL, "medicationId" integer NOT NULL, CONSTRAINT "PK_3f4a6ed1f6e164f7c88bba52ce7" PRIMARY KEY ("subCategoryId", "medicationId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_169814ece1b1c0ae4c501b4cec" ON "sub_category_medications_medication" ("subCategoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb60c2f492993720875658f9e2" ON "sub_category_medications_medication" ("medicationId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_70f9b6a4aae05f87d03e771a81e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_f28cf7cf65a7bf745e49686610a" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_category_medications_medication" ADD CONSTRAINT "FK_169814ece1b1c0ae4c501b4cecf" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_category_medications_medication" ADD CONSTRAINT "FK_fb60c2f492993720875658f9e25" FOREIGN KEY ("medicationId") REFERENCES "medication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_category_medications_medication" DROP CONSTRAINT "FK_fb60c2f492993720875658f9e25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_category_medications_medication" DROP CONSTRAINT "FK_169814ece1b1c0ae4c501b4cecf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_f28cf7cf65a7bf745e49686610a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_70f9b6a4aae05f87d03e771a81e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb60c2f492993720875658f9e2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_169814ece1b1c0ae4c501b4cec"`,
    );
    await queryRunner.query(`DROP TABLE "sub_category_medications_medication"`);
    await queryRunner.query(`DROP TABLE "medication"`);
    await queryRunner.query(`DROP TABLE "sub_category"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2b5187e7475dcc88f25bec3967"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2af7646e11a0872eb9a0212545"`,
    );
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
