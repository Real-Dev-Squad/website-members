import { render, screen } from '@testing-library/react';
import MemberCard from 'components/member-card';

describe('Members Card', () => {
  it('should render members full name', () => {
    const developerInfo = {
      username: 'sumit',
      first_name: 'Sumit',
      last_name: 'Dhanania',
      img_url: 'http://test.png',
      isMember: true,
    };

    render(<MemberCard developerInfo={developerInfo} />);

    const heading = screen.getByText('Sumit Dhanania');
    expect(heading).toBeInTheDocument();
  });
});
