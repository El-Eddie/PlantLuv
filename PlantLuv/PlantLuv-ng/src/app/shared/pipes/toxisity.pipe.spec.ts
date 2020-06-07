import { ToxisityPipe } from './toxisity.pipe';

describe('ToxisityPipe', () => {
  it('create an instance', () => {
    const pipe = new ToxisityPipe();
    expect(pipe).toBeTruthy();
  });
});
