import { MikroORM, EntityManager, RequestContext, wrap } from "@mikro-orm/core";
import path from "path"
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-body';
const app = new Koa();

import { Book } from './entities/Book'
import { Author } from './entities/Author'

const root: string = path.resolve(__dirname, "..")

export const DI = {} as {
  orm: MikroORM
}


// export const main = (async () => {
//   console.log('main')
//   const DI.orm = await MikroORM.init();
//   const author = await new Author('Jon Snow', 'snow@wall.st');
//   // orm.em.persist(author);
//   // console.log('author', author)
//   // await orm.em.flush();
//   console.log(orm.em);
// })
// main()

const api = new Router();
api.get('/', (ctx: Context) => ctx.body = { message: 'Welcome to MikroORM Koa TS example, try CRUD on /author and /book endpoints!' });

api.get('/authors', async (ctx: Context)=> {
  ctx.body = await DI.orm.em.find(Author, {})
});

api.get('/authors/:id', async (ctx: Context)=> {
  ctx.body = await DI.orm.em.findOneOrFail(Author, {id: ctx.params.id})
});

api.post('/authors', async (ctx: Context) => {
  try{
    console.log('ctx body', ctx.request.body)
    const author = DI.orm.em.create(Author, ctx.request.body)
    await DI.orm.em.persistAndFlush(author)
    console.log('author added: ', author)
  } catch (error) {
    console.log(error);
    return ctx.throw(400, { message: error})
  }
});

api.put('/authors/:id', async (ctx: Context) => {
  const book = await DI.orm.em.findOneOrFail(Author, {id: ctx.params.id})

  wrap(book).assign(ctx.request.body)
  await DI.orm.em.persistAndFlush(book)

  ctx.body = book
});

api.post('/books', async (ctx: Context) => {
  const bookRepository = DI.orm.em.getRepository(Book)
  try {
    const book = await bookRepository.create(ctx.request.body)
    await bookRepository.persistAndFlush(book)
  } catch (err) {
    console.log(err)
  }
});

api.get('/books', async (ctx: Context) => {
  ctx.body = await DI.orm.em.find(Book, {})
});

(async () => {
  DI.orm = await MikroORM.init();

  app.use(bodyParser());
  app.use((ctx, next) => RequestContext.createAsync(DI.orm.em, next));
  app.use(api.routes());
  app.use(api.allowedMethods());

  app.use((ctx, next) => {
    ctx.status = 404;
    ctx.body = { message: 'No route found' };
  });
  console.log(DI.orm.em)
  // const author = new Author('Jon Snow', 'snow@wall.st', 30);
  // DI.orm.em.persistAndFlush(author)
})();



app.listen('3000', () => {
  console.log(`MikroORM Koa TS example started at http://localhost:3000`);
});
