import Router from 'koa-router';
import Chance from 'chance';
import android from './android';
import readers from './readers';
import { ILogin, ICMSAccount } from '../models/staff';

const chance = new Chance();
const router = new Router({
  prefix: '/api'
});

/**
 * @description Login. Use password `12345678` to test wrong credentials.
 * You can user any user name to login. The username
 * is simply returned in the response.
 */
router.post('/login', (ctx, next) => {
  const credentials: ILogin = ctx.request.body;
  if (credentials.password === '12345678') {
    ctx.status = 404;
    return;
  }

  const account: ICMSAccount = {
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

router.use('/readers', readers.routes());
router.use('/android', android.routes());

console.log(router.stack.map(layer => layer.path));

export default router;
