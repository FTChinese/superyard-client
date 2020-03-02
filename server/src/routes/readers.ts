import Router from 'koa-router';
import Chance from 'chance';
import validator from 'validator';
import { DateTime } from 'luxon';
import { IBaseReader, IMembership, IReaderAccount } from '../models/reader';
import { IApiErrorBody } from '../models/errors';
import { AccountKind, Tier, Cycle } from '../models/enums';

interface IQuery {
  q: string;
  kind: AccountKind;
}

const chance = new Chance();
const router = new Router();
const ftcRouter = new Router();
const wxRouter = new Router();

const tiers: Tier[] = ['premium', 'standard'];
const cycles: Cycle[] = ['month', 'year'];

const accountDb = new Map<string, IBaseReader>();
const subsDb = new Map<string, IMembership>();

function generateFtcAccount(email: string): IBaseReader {

  return {
    ftcId: chance.guid(),
    unionId: null,
    stripeId: null,
    email,
    userName: chance.word(),
    nickname: null,
    kind: 'ftc',
  };
}

function generateWxAccount(nickname: string): IBaseReader {
  return {
    ftcId: null,
    unionId: chance.string({ length: 30, alpha: true, numeric: true }),
    stripeId: null,
    email: null,
    userName: null,
    nickname,
    kind: 'wechat',
  };
}

function generateSubs(account: IBaseReader): IMembership {
  const t = tiers[chance.integer({min: 0, max: 1})];
  const c = cycles[chance.integer({min: 0, max: 1})];

  return {
    id: `mmb_${chance.string({ length: 12 })}`,
    compoundId: (account.kind === 'ftc' ? account.ftcId : account.unionId) || '',
    ftcId: account.ftcId,
    unionId: account.unionId,
    tier: t,
    cycle: t === 'premium' ? 'year' : c,
    expireDate: DateTime.fromJSDate(chance.date()).toISODate(),
    paymentMethod: 'alipay',
    autoRenewal: false,
    stripeSubId: null,
    stripePlanId: null,
    status: null,
    appleSubId: null,
    vip: false,
  };
}

function loadAnAccount(id: string): IReaderAccount | null {
  console.log(`Loading account ${id}`);

  const baseAcount = accountDb.get(id);

  if (!baseAcount) {
    return null;
  }

  const membership = subsDb.get(id);
  if (!membership) {
    return {
      ...baseAcount,
      membership: {
        id: null,
        compoundId: '',
        ftcId: null,
        unionId: null,
        tier: null,
        cycle: null,
        expireDate: null,
        paymentMethod: null,
        autoRenewal: false,
        stripeSubId: null,
        stripePlanId: null,
        status: null,
        appleSubId: null,
        vip: false,
      }
    };
  }

  return {
    ...baseAcount,
    membership,
  };
}

/**
 * @description
 * /search?q=<keyword>&kind<ftc|wechat>
 */
router.get('/search', (ctx, next) => {
  const query: IQuery = ctx.request.query;

  console.log(`Searching user ${query.q}: ${query.kind}`);

  const account = query.kind === 'ftc'
    ? generateFtcAccount(query.q)
    : generateWxAccount(query.q);

  const id = account.kind === 'ftc' ? account.ftcId : account.unionId;

  if (id) {
    console.log(`Saving account ${id}`);
    accountDb.set(id, account);
  }

  if (chance.bool()) {
    const subs = generateSubs(account);
    console.log(`Saving membership ${subs.compoundId}`);
    subsDb.set(subs.compoundId, subs);
  }

  ctx.body = [account];
});

ftcRouter.get('/:id', (ctx, next) => {
  const id: string = ctx.params.id;

  const account = loadAnAccount(id);
  if (!account) {
    ctx.status = 404;
    return;
  }

  ctx.body = account;
});

ftcRouter.get('/:id/profile', (ctx, next) => {

});

ftcRouter.get('/:id/activities', (ctx, next) => {

});

wxRouter.get('/:id', (ctx, next) => {
  const id: string = ctx.params.id;

  const account = loadAnAccount(id);
  if (!account) {
    ctx.status = 404;
    return;
  }

  ctx.body = account;
});

wxRouter.get('/:id/profile', (ctx, next) => {

});

wxRouter.get('/:id/login', (ctx, next) => {

});

router.use('/ftc', ftcRouter.routes());
router.use('/wx', wxRouter.routes());

export default router;
