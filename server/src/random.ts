const util = require('util');
import crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = util.promisify(crypto.randomBytes);

async function random(size: number, encoding: 'hex' | 'utf8' | 'base64') {
  const buf = await randomBytes(size);
  if (!encoding) {
    return buf;
  }
  return buf.toString(encoding);
}

export function hex(size: number = 32) {
  return random(size, 'hex');
}
