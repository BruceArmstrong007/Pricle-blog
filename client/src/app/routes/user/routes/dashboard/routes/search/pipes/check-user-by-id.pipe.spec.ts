import { CheckUserByIDPipe } from './check-user-by-id.pipe';

describe('CheckUserByIDPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckUserByIDPipe();
    expect(pipe).toBeTruthy();
  });
});
