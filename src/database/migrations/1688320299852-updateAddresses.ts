import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAddresses1688320299852 implements MigrationInterface {
  name = 'UpdateAddresses1688320299852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_b0c93a6592ae2721c54c8e351f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "customerIdId" TO "customerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "customerId" TO "customerIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_b0c93a6592ae2721c54c8e351f2" FOREIGN KEY ("customerIdId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
