import Router from 'koa-router';
import Chance from 'chance';
import { IProfile, ICMSAccount } from '../../../src/app/models/staff';
import { isoNow } from '../time';

const pool = 'abcdedfghijklmnopqrstuvwxyz';

const chance = new Chance();
const router = new Router();

function generateAccount(): ICMSAccount {
  return {
    id: `stf_${chance.string({length: 12, pool})}`,
    userName: chance.word(),
    email: chance.email(),
    isActive: true,
    displayName: chance.name(),
    department: 'tech',
    groupMembers: 8,
  };
}

function buildStaff(account: ICMSAccount): IProfile {
  return {
    ...account,
    createdAt: isoNow(),
    deactiveatedAt: null,
    updatedAt: null,
    lastLoginAt: null,
    lastLoginIp: chance.ip(),
  };
}

function createStaffStore(): Map<string, IProfile> {
  const store = new Map<string, IProfile>();

  for (let i = 0; i < 10; i++) {
    const p = buildStaff(generateAccount());

    store.set(p.id, p);
  }

  return store;
}

const staffStore = createStaffStore();

/**
 * @description Get a list of staff.
 * /staff?page=<number>&per_page=<number>
 */
router.get('/', (ctx, next) => {
  ctx.body = Array
    .from(staffStore.values())
    .filter(profile => profile.isActive);
});

/**
 * @description Create a staff
 */
router.post('/', (ctx, next) => {
  const account: ICMSAccount = ctx.request.body;

  const profile = buildStaff(account);

  staffStore.set(profile.id, profile);

  ctx.status = 204;
});

/**
 * @description Get a staff's profile
 */
router.get('/:id', (ctx, next) => {
  const id: string = ctx.params.id;

  const profile = staffStore.get(id);

  if (!profile) {
    ctx.status = 404;
    return;
  }

  staffStore.set(id, profile);
  ctx.status = 204;
});

/**
 * @description Update a staff's profile
 */
router.patch('/:id', (ctx, next) => {
  const id: string = ctx.params.id;

  const profile = staffStore.get(id);

  if (!profile) {
    ctx.status = 404;
    return;
  }

  const account: ICMSAccount = ctx.request.body;

  Object.assign(profile, account);

  staffStore.set(id, profile);

  ctx.status = 204;
});

/**
 * @description Delete a staff.
 */
router.delete('/:id', (ctx, next) => {
  const id: string = ctx.params.id;

  const profile = staffStore.get(id);

  if (!profile) {
    ctx.status = 404;
    return;
  }

  profile.isActive = false;
  staffStore.set(profile.id, profile);

  ctx.status = 204;
});

/**
 * @description Reinstate a deactivated staff
 */
router.put('/:id', (ctx, next) => {
  const id: string = ctx.params.id;

  const profile = staffStore.get(id);

  if (!profile) {
    ctx.status = 404;
    return;
  }

  profile.isActive = true;
  staffStore.set(profile.id, profile);

  ctx.status = 204;
});

/**
 * @description Change staff's password.
 */
router.patch('/:id/password', (ctx, next) => {

});

export default router;
