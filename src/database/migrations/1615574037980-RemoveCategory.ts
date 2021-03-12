import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCategory1615574037980 implements MigrationInterface {
  name = 'RemoveCategory1615574037980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e"`,
    );
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "blog_type"`);
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "published_date"`);
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "categoryId"`);
    await queryRunner.query(`DROP TABLE "blog_categories"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blogs" ADD "categoryId" uuid`);
    await queryRunner.query(`ALTER TABLE "blogs" ADD "published_date" date`);
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD "blog_type" text DEFAULT 'Draft'`,
    );
    await queryRunner.query(`ALTER TABLE "blogs" ADD "image" text`);
    await queryRunner.query(
      `CREATE TABLE "blog_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_1056d6faca26b9957f5d26e6572" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e" FOREIGN KEY ("categoryId") REFERENCES "blog_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
