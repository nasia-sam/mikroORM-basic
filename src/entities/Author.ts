import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Book } from "./Book";

@Entity()
export class Author {
  @PrimaryKey()
  id!: number

  @Property()
  name!: string

  @Property()
  email!: string;

  @Property()
  age?: number;

  @OneToMany(() => Book, book => book.author)
  books1 = new Collection<Book>(this);

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;
  }
}