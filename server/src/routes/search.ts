import Router from 'koa-router';
import Chance from 'chance';
import { DateTime } from 'luxon';

const chance = new Chance();
const router = new Router();

/**
 * @description Search by user's name.
 * /search/staff?name=<user_name>
 */
router.get('/staff', (ctx, next) => {

});

/**
 * @description Search readers.
 * Search ftc account: /search/reader?q=<email>&kind=ftc
 * Search wx account: /search/reader?q=<nickname>&kind=wechat&page=<number>&per_page=<number>
 */
router.get('/reader', (ctx, next) => {

});

export default router;
