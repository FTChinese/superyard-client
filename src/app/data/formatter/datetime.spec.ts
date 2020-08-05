import { normalizeTime } from './datetime';

describe('Date time formtter', () => {
  it('padding time', () => {
    expect(normalizeTime('00:00')).toEqual('00:00:00');
    expect(normalizeTime('00:00:00:00')).toEqual('00:00:00');
  });
});
