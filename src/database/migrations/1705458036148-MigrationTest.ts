import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest1705458036148 implements MigrationInterface {
    name = 'MigrationTest1705458036148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`group\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), UNIQUE INDEX \`IDX_d090ad82a0e97ce764c06c7b31\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), UNIQUE INDEX \`IDX_881f72bac969d9a00a1a29e107\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4ba6d0c734d53f8e1b2e24b6c5\` (\`username\`), UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), UNIQUE INDEX \`IDX_bacf1cabdd51dca73d1a57ea66\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`ip\` varchar(255) NULL, \`userAgent\` varchar(255) NULL, \`expiresAt\` datetime NOT NULL, \`isRevoked\` tinyint NOT NULL DEFAULT 0, \`revokedAt\` datetime NULL, \`revokedByIp\` varchar(255) NULL, \`revokedByUserAgent\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`admin_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_permission\` (\`permission_id\` int NOT NULL, \`admin_id\` int NOT NULL, INDEX \`IDX_d90bbb45d36502dde413189fea\` (\`permission_id\`), INDEX \`IDX_9cbadc2a299085cb12a24711da\` (\`admin_id\`), PRIMARY KEY (\`permission_id\`, \`admin_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permission\` (\`permission_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_e3a3ba47b7ca00fd23be4ebd6c\` (\`permission_id\`), INDEX \`IDX_3d0a7155eafd75ddba5a701336\` (\`role_id\`), PRIMARY KEY (\`permission_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_role\` (\`role_id\` int NOT NULL, \`admin_id\` int NOT NULL, INDEX \`IDX_5834613c9dcc3dd3373f3b6cc0\` (\`role_id\`), INDEX \`IDX_529430c0d487e4872848790949\` (\`admin_id\`), PRIMARY KEY (\`role_id\`, \`admin_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_c075e8f0607cdaa90baca7c2f17\` FOREIGN KEY (\`admin_id\`) REFERENCES \`admins\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admin_permission\` ADD CONSTRAINT \`FK_d90bbb45d36502dde413189fea1\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`admin_permission\` ADD CONSTRAINT \`FK_9cbadc2a299085cb12a24711daf\` FOREIGN KEY (\`admin_id\`) REFERENCES \`admins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3a3ba47b7ca00fd23be4ebd6cf\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_3d0a7155eafd75ddba5a7013368\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admin_role\` ADD CONSTRAINT \`FK_5834613c9dcc3dd3373f3b6cc05\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`admin_role\` ADD CONSTRAINT \`FK_529430c0d487e48728487909493\` FOREIGN KEY (\`admin_id\`) REFERENCES \`admins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin_role\` DROP FOREIGN KEY \`FK_529430c0d487e48728487909493\``);
        await queryRunner.query(`ALTER TABLE \`admin_role\` DROP FOREIGN KEY \`FK_5834613c9dcc3dd3373f3b6cc05\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_3d0a7155eafd75ddba5a7013368\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3a3ba47b7ca00fd23be4ebd6cf\``);
        await queryRunner.query(`ALTER TABLE \`admin_permission\` DROP FOREIGN KEY \`FK_9cbadc2a299085cb12a24711daf\``);
        await queryRunner.query(`ALTER TABLE \`admin_permission\` DROP FOREIGN KEY \`FK_d90bbb45d36502dde413189fea1\``);
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_c075e8f0607cdaa90baca7c2f17\``);
        await queryRunner.query(`DROP INDEX \`IDX_529430c0d487e4872848790949\` ON \`admin_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_5834613c9dcc3dd3373f3b6cc0\` ON \`admin_role\``);
        await queryRunner.query(`DROP TABLE \`admin_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d0a7155eafd75ddba5a701336\` ON \`role_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3a3ba47b7ca00fd23be4ebd6c\` ON \`role_permission\``);
        await queryRunner.query(`DROP TABLE \`role_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_9cbadc2a299085cb12a24711da\` ON \`admin_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_d90bbb45d36502dde413189fea\` ON \`admin_permission\``);
        await queryRunner.query(`DROP TABLE \`admin_permission\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_bacf1cabdd51dca73d1a57ea66\` ON \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ba6d0c734d53f8e1b2e24b6c5\` ON \`admins\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_881f72bac969d9a00a1a29e107\` ON \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_d090ad82a0e97ce764c06c7b31\` ON \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
