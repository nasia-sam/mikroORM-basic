import { Entity, BaseEntity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core"
import { Author } from "./Author"

@Entity()
export class Book {
  @PrimaryKey()
  id!: number

  @Property()
  title!: string

  @ManyToOne(() => Author)
  author!: Author

  
  constructor(title: string, author: Author) {
    this.title = title;
    this.author = author;
  }
}