import Router from 'koa-router';
import Chance from 'chance';
import { DateTime } from 'luxon';
import slug from 'slug';
import { hex } from '../random';
import { IApiApp, IApiAccess } from '../../../src/app/models/oauth';
import { async } from 'rxjs/internal/scheduler/async';

const chance = new Chance();
const router = new Router();

async function generateApp(): Promise<IApiApp> {
  const name = chance.name();
  const slugName = slug(name);
  const clientId = await hex(10);
  const clientSecret = await hex(32);

  return {
    name,
    slug: slugName,
    clientId,
    clientSecret,
    repoUrl: chance.url(),
    description: chance.paragraph(),
    homeUrl: chance.url(),
    callbackUrl: null,
    isActive: true,
    createdAt: DateTime.utc().toISO({ suppressMilliseconds: true }),
    updatedAt: DateTime.utc().toISO({ suppressMilliseconds: true }),
    ownedBy: chance.word(),
  };
}

async function generateAppAccess(app: IApiApp): Promise<IApiAccess> {
  return {
    id: chance.integer(),
    token: await hex(20),
    isActive: true,
    expiresIn: null,
    usage: 'app',
    description: null,
    createdBy: chance.name(),
    clientId: app.clientId,
    createdAt: DateTime.utc().toISO({ suppressMilliseconds: true }),
    updatedAt: DateTime.utc().toISO({ suppressMilliseconds: true }),
    lastUsedAt: null,
  };
}

async function generatePersonalKey(staffName: string): Promise<IApiAccess> {
  return {
    id: chance.integer(),
    token: await hex(20),
    isActive: true,
    expiresIn: null,
    usage: 'personal',
    description: null,
    createdBy: staffName,
    clientId: null,
    createdAt: DateTime.utc().toISO({ suppressMilliseconds: true }),
    updatedAt: DateTime.utc().toISO({ suppressMilliseconds: true }),
    lastUsedAt: null,
  };
}

const appStore = new Map<string, IApiApp>();
const tokenStore = new Map<number, IApiAccess>();

router.get('/apps', async (ctx, next) => {

  // Prepopulate some data if empty.
  if (appStore.size === 0) {
    for (let i = 0; i < 5; i++) {
      const app = await generateApp();
      appStore.set(app.clientId, app);
    }
  }

  const data = Array.from(appStore.values());

  ctx.body = data;
});

router.post('/apps', async (ctx, next) => {
  const app: IApiApp = ctx.request.body;

  appStore.set(app.clientId, app);

  ctx.status = 204;
});

router.get('/apps/:id', async (ctx, next) => {
  const id = ctx.params.id;

  const app = appStore.get(id);

  if (!app) {
    ctx.status = 404;
    return;
  }

  ctx.body = app;
});

router.patch('/apps/:id', async (ctx, next) => {
  const app: IApiApp = ctx.request.body;
  appStore.set(app.clientId, app);

  ctx.status = 204;
});

router.delete('/apps/:id', async (ctx, next) => {
  const id = ctx.params.id;

  appStore.delete(id);

  ctx.status = 204;
});

router.get('/keys', async (ctx, next) => {
  const clientId = ctx.query.client_id;
  const staffName = ctx.query.staff_name;

  if (clientId) {
    ctx.body = Array.from(tokenStore.values()).filter(t => t.clientId === clientId);
    return;
  }

  if (staffName) {
    ctx.body = Array.from(tokenStore.values()).filter(t => t.createdBy === staffName);

    return;
  }

  ctx.status = 404;
});

router.post('/keys', async (ctx, next) => {
  const key: IApiAccess = ctx.request.body;
  key.id = chance.integer();

  tokenStore.set(key.id, key);

  ctx.status = 204;
});

router.delete('/keys/:id', async (ctx, next) => {
  const id = ctx.params.id;

  tokenStore.delete(id);

  ctx.status = 204;
});

export default router;
