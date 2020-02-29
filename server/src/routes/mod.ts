import Router from 'koa-router';
import Chance from 'chance';
import android from './android';
import { ILogin, ICMSAccount } from '../models/staff';

const chance = new Chance();
const router = new Router({
  prefix: '/api'
});

router.post('/login', (ctx, next) => {
  const credentials: ILogin = ctx.request.body;
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

router.use('/android', android.routes());

console.log(router.stack.map(layer => layer.path));

export default router;
