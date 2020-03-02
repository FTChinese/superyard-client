import Router from 'koa-router';
import Chance from 'chance';
import { DateTime } from 'luxon';
import { IRelease, IReleaseBase } from '../models/android';
import { IApiErrorBody } from '../models/errors';

const chance = new Chance();
const router = new Router();

function generateBody(): string {
  const para = chance.paragraph();
  return para.split('.').filter(s => s.length > 0).map(s => `* ${s}`).join('\r\n');
}

function generateSemVer(): string {
  return `v${chance.integer({min: 0, max: 10})}.${chance.integer({min: 0, max: 10})}.${chance.integer({min: 0, max: 10})}`;
}

function generateISOTime(): string {
  return DateTime.fromJSDate(chance.date()).toISO({
    suppressMilliseconds: true,
  });
}

function generateRelease(tag: string): IRelease {
  const t = generateISOTime();
  return {
    versionName: tag,
    versionCode: chance.integer({ min: 1, max: 100 }),
    body: generateBody(),
    apkUrl: chance.url(),
    createdAt: t,
    updatedAt: t,
  };
}

function createDB(): Map<string, IRelease> {
  const store = new Map<string, IRelease>();

  for (let i = 0; i < 5; i++) {
    const r = generateRelease(generateSemVer());
    store.set(r.versionName, r);
  }

  return store;
}

const db = createDB();

router.get('/gh/latest', (ctx, next) => {
  ctx.body = generateRelease(generateSemVer());
});

router.get('/gh/tags/:tag', (ctx, next) => {
  const tag: string = ctx.params.tag;
  ctx.body = generateRelease(tag);
});

router.get('/releases', (ctx, next) => {
    ctx.body = Array.from(db.values());
});

router.post('/releases', (ctx, next) => {
  const release: IRelease = ctx.request.body;
  if (db.has(release.versionName)) {
    ctx.status = 422;
    const body: IApiErrorBody = {
      message: 'Duplicate version',
      error: {
        field: 'versionName',
        code: 'already_exists',
      },
    };

    ctx.body = body;
    return;
  }

  db.set(release.versionName, release);

  ctx.status = 204;
});

router.get('/releases/:tag', (ctx, next) => {
  const tag: string = ctx.params.tag;

  if (db.has(tag)) {
    ctx.body = db.get(tag);
    return;
  }

  ctx.status = 404;
});

router.patch('/releases/:tag', (ctx, next) => {
  const tag: string = ctx.params.tag;
  const release: IReleaseBase = ctx.request.body;

  const current = db.get(tag);

  if (!current) {
    console.log('Cannot update a release: not found');
    ctx.status = 404;
    return;
  }

  console.log('Updating release: %o', current);
  db.set(
    tag,
    {
      ...release,
      createdAt: current.createdAt,
      updatedAt: DateTime.utc().toISO({ suppressMilliseconds: true })
    }
  );

  ctx.status = 204;
});

export default router;
