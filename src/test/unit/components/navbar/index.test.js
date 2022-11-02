import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '@components/UI/navbar';
import * as utils from '../../../../utils';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('Login Using Github', () => {
  const spy = jest.spyOn(utils, 'setGithubMockLoginTTL');
  it('should render mock github url', async () => {
    render(<Navbar />);
    const signInWithGithubBtn = await screen.findByText('Sign In With GitHub');
    fireEvent.click(signInWithGithubBtn);
    expect(spy).toHaveBeenCalledWith(true);
  });
  it('should not render mock github url', async () => {
    render(<Navbar />);
    const signInWithGithubBtn = await screen.findByText('Sign In With GitHub');
    fireEvent.click(signInWithGithubBtn);
    expect(spy).toHaveBeenCalledWith(false);
  });
});
