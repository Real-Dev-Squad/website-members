import { render, screen } from '@testing-library/react';
import MemberCard from '@components/member-card';
import { UserContextProvider } from '@store/user/user-context';
import { KeyboardProvider } from '@store/keyboard/context';

describe('Members Card', () => {
  it('should render members full name', () => {
    const developerInfo = {
      username: 'sumit',
      first_name: 'Sumit',
      last_name: 'Dhanania',
      img_url: 'http://test.png',
      isMember: true,
    };

    render(
      <UserContextProvider>
        <KeyboardProvider>
          <MemberCard developerInfo={developerInfo} />
        </KeyboardProvider>
      </UserContextProvider>
    );

    const heading = screen.getByText('Sumit Dhanania');
    expect(heading).toBeInTheDocument();
  });
});
