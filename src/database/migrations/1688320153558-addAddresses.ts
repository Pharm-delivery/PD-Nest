import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddresses1688320153558 implements MigrationInterface {
  name = 'AddAddresses1688320153558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "zipCode" character varying NOT NULL, "address1" character varying NOT NULL, "address2" character varying, "lat" character varying NOT NULL, "lng" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customerIdId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_b0c93a6592ae2721c54c8e351f2" FOREIGN KEY ("customerIdId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_b0c93a6592ae2721c54c8e351f2"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
