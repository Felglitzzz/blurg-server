import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1615502243772 implements MigrationInterface {
  name = 'InitialMigration1615502243772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_1056d6faca26b9957f5d26e6572" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" character varying NOT NULL, "role" text NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text NOT NULL, "lastName" text NOT NULL, "phone_number" character varying, "image" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "userId" uuid NOT NULL, CONSTRAINT "UQ_871093a81f41bb9a3bb95a5f5f0" UNIQUE ("firstName"), CONSTRAINT "UQ_c19c7b67b871f79a4e753969219" UNIQUE ("lastName"), CONSTRAINT "UQ_7fce3640a102ce16fb86f642915" UNIQUE ("phone_number"), CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "content" text, "image" text, "blog_type" text DEFAULT 'Draft', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "published_date" date, "profileId" uuid, "categoryId" uuid, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_eef7fddcc1a14874f74c283a855" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e" FOREIGN KEY ("categoryId") REFERENCES "blog_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_8c937e1b5e2c1269689bcf1138e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_eef7fddcc1a14874f74c283a855"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(`DROP TABLE "blogs"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "blog_categories"`);
  }
}
