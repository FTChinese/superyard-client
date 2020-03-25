import Router from 'koa-router';
import Chance from 'chance';
import slug from 'slug';
import { hex } from '../random';
import { isoNow } from '../time';
import { IApiApp, IAccessToken, IAppBase, ITokenBase } from '../../../src/app/models/oauth';
import { async } from 'rxjs/internal/scheduler/async';
import { ApiKeyKind } from '../../../src/app/models/enums';

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

async function createToken(baseToken: ITokenBase, usage: ApiKeyKind): Promise<IAccessToken> {
  return {
    ...baseToken,
    id: chance.integer(),
    token: await hex(20),
    isActive: true,
    expiresIn: null,
    kind: usage,
    createdAt: isoNow(),
    updatedAt: isoNow(),
    lastUsedAt: null,
  };
}

const appStore = new Map<string, IApiApp>();
const tokenStore = new Map<number, IAccessToken>();

/**
 * @description Get a list of apps.
 * /apps?page=<int>&per_page=<int>
 */
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

/**
 * @description Create a new app
 */
router.post('/apps', async (ctx, next) => {
  const baseApp: IAppBase = ctx.request.body;
  const app = await createApp(baseApp);

  appStore.set(app.clientId, app);

  ctx.status = 204;
});

/**
 * @description Get a specific app
 */
router.get('/apps/:id', async (ctx, next) => {
  const id = ctx.params.id;

  const app = appStore.get(id);

  if (!app) {
    ctx.status = 404;
    return;
  }

  ctx.body = app;
});

/**
 * @description Update an app
 */
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

/**
 * @description Deactivate an app
 */
router.delete('/apps/:id', async (ctx, next) => {
  const id = ctx.params.id;

  const app = appStore.get(id);
  if (app) {
    app.isActive = false;
    appStore.set(id, app);
  }

  ctx.status = 204;
});

/**
 * @description Get a list access tokens.
 * /api/keys?client_id=<string>&page=<number>&per_page=<number>
 * /api/keys?staff_name=<string>&page=<number>&per_page=<number>
 */
router.get('/keys', async (ctx, next) => {
  const clientId = ctx.query.client_id;
  const staffName = ctx.query.staff_name;

  if (clientId) {
    ctx.body = Array.from(tokenStore.values())
      .filter(t => {
        return t.clientId === clientId && t.kind === 'app';
      });
    return;
  }

  if (staffName) {
    ctx.body = Array.from(tokenStore.values())
      .filter(t => {
        return t.createdBy === staffName && t.kind === 'personal';
      });

    return;
  }

  ctx.status = 404;
});

/**
 * @description Create a new key.
 */
router.post('/keys', async (ctx, next) => {
  const baseToken: ITokenBase = ctx.request.body;

  const key = await createToken(baseToken, 'personal');

  tokenStore.set(key.id, key);

  ctx.status = 204;
});

/**
 * @description Delete a key owned by a staff.
 */
router.delete('/keys/:id', async (ctx, next) => {
  const id = ctx.params.id;

  tokenStore.delete(id);

  ctx.status = 204;
});

export default router;
