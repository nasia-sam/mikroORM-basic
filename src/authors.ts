import { Context } from 'koa';
import Router from 'koa-router';
import { createContext } from 'vm';
import { Author } from './entities/Author';

import { DI } from './index'

const router = new Router()

router.get('/', async (ctx: Context)=> {
  ctx.body = await DI.orm.em.find(Author, {})
}) 