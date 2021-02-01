import { Migration } from '@mikro-orm/migrations';

export class Migration20210111073825 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `author` (`id` integer not null primary key autoincrement, `name` varchar not null, `email` varchar not null, `age` integer not null);');

    this.addSql('create table `book` (`id` integer not null primary key autoincrement, `title` varchar not null);');

    this.addSql('alter table `book` add column `author_id` integer null;');
    this.addSql('create index `book_author_id_index` on `book` (`author_id`);');
  }

}
