import { PayMethodPipe } from './pay-method.pipe';

describe('PayMethodPipe', () => {
  it('create an instance', () => {
    const pipe = new PayMethodPipe();
    expect(pipe).toBeTruthy();
  });
});
