import Router from 'koa-router';
import Chance from 'chance';
import slug from 'slug';
import { hex } from '../random';
import { isoNow } from '../time';
import { IApiApp, IApiAccess, IAppBase } from '../../../src/app/models/oauth';

const chance = new Chance();
const router = new Router();

function mockAppFormData(): IAppBase {
  const name = chance.name();
  const slugName = slug(name);

  return {
    name,
    slug: slugName,
    repoUrl: chance.url(),
    description: chance.paragraph(),
    homeUrl: chance.url(),
    callbackUrl: null,
  };
}

async function createApp(baseApp: IAppBase): Promise<IApiApp> {
  return {
    ...baseApp,
    clientId: await hex(10),
    clientSecret: await hex(32),
    isActive: true,
    createdAt: isoNow(),
    updatedAt: isoNow(),
    ownedBy: '',
  };
}

async function generateApp(): Promise<IApiApp> {
  return createApp(mockAppFormData());
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
    createdAt: isoNow(),
    updatedAt: isoNow(),
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
    createdAt: isoNow(),
    updatedAt: isoNow(),
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
  const baseApp: IAppBase = ctx.request.body;
  const app = await createApp(baseApp);

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
  const clientId = ctx.params.id;
  const app = appStore.get(clientId);

  if (!app) {
    ctx.status = 404;
    return;
  }

  const baseApp: IAppBase = ctx.request.body;

  Object.assign(app, baseApp);
  app.updatedAt = isoNow();

  appStore.set(clientId, app);

  ctx.status = 204;
});

router.delete('/apps/:id', async (ctx, next) => {
  const id = ctx.params.id;

  const app = appStore.get(id);
  if (app) {
    app.isActive = false;
    appStore.set(id, app);
  }

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
