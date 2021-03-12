import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueConstraints1615535575828
  implements MigrationInterface {
  name = 'RemoveUniqueConstraints1615535575828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "profile"."firstName" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_871093a81f41bb9a3bb95a5f5f0"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "profile"."lastName" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_c19c7b67b871f79a4e753969219"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_7fce3640a102ce16fb86f642915"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone_number"`);
    await queryRunner.query(`ALTER TABLE "profile" ADD "phone_number" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone_number"`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "phone_number" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_7fce3640a102ce16fb86f642915" UNIQUE ("phone_number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_c19c7b67b871f79a4e753969219" UNIQUE ("lastName")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "profile"."lastName" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_871093a81f41bb9a3bb95a5f5f0" UNIQUE ("firstName")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "profile"."firstName" IS NULL`);
  }
}
