import Router from 'koa-router';
import Chance from 'chance';
import staff from './staff';
import apiAccess from './api-access';
import android from './android';
import readers from './readers';
import search from './search';
import { ILogin, StaffAccount } from '../../../src/app/models/staff';
import { IApiErrorBody } from '../../../src/app/models/request-result';

const chance = new Chance();
const router = new Router({
  prefix: '/api'
});

interface InvalidResp {
  userName: IApiErrorBody;
  password: IApiErrorBody;
}

const invalids: InvalidResp = {
  userName: {
    message: 'Invalid username',
    error: {
      field: 'userName',
      code: 'missing_field'
    }
  },
  password: {
    message: 'Invalid password',
    error: {
      field: 'password',
      code: 'missing_field',
    }
  }
};

/**
 * @description Login. Use password `12345678` to test wrong credentials.
 * You can user any user name to login. The username
 * is simply returned in the response.
 */
router.post('/login', (ctx, next) => {
  const credentials: ILogin = ctx.request.body;

  if (credentials.userName === 'not_found') {
    ctx.status = 404;
    return;
  }

  if (credentials.userName === 'invalid_username') {
    ctx.status = 422;
    ctx.body = invalids.userName;
    return;
  }

  if (credentials.userName === 'invalid_password') {
    ctx.status = 422;
    ctx.body = invalids.password;
    return;
  }

  const account: StaffAccount = {
    id: `stf_${chance.string({length: 12})}`,
    userName: credentials.userName,
    email: `${credentials.userName}@ftchinese.com`,
    isActive: true,
    displayName: credentials.userName,
    department: 'tech',
    groupMembers: 8,
  };

  ctx.body = account;
});

router.use('/staff', staff.routes());
router.use('/oauth', apiAccess.routes());
router.use('/readers', readers.routes());
router.use('/android', android.routes());
router.use('/search', search.routes());

console.log(router.stack.map(layer => layer.path));

export default router;
