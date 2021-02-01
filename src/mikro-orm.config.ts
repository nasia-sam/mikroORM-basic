import { Options } from '@mikro-orm/core';

import { Book } from './entities/Book'
import { Author } from './entities/Author'

const config: Options = {
  type: 'sqlite',
  dbName: 'test.db',
  // as we are using class references here, we don't need to specify `entitiesTs` option
  entities: [Author, Book],
  debug: true,
};

export default config;