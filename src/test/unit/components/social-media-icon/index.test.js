import { render, screen } from '@testing-library/react';
import SocialMediaIcon from '@components/social-media-icon';
import iconMapper from '@components/social-media-icon/social-media.constant';

const testData = {
  id: 'ankushdharkar',
  type: 'linkedin_id',
};

describe('describe Social Media Icon', () => {
  beforeEach(() =>
    render(<SocialMediaIcon id={testData.id} type={testData.type} />)
  );

  it('Should render img icon properly ', () => {
    const socialMediaIcon = screen.getByAltText('linkedIn');
    expect(socialMediaIcon).toBeInTheDocument();
    expect(socialMediaIcon).toHaveAttribute(
      'src',
      iconMapper[testData.type].src
    );
  });

  it('Should render the info icon correctly', () => {
    const socialMediaAnchor = document.querySelector('a');

    expect(socialMediaAnchor).toHaveAttribute('target', '_blank');
    expect(socialMediaAnchor).toHaveAttribute('rel', 'noreferrer');
    expect(socialMediaAnchor).toHaveAttribute('tabIndex', '0');
    expect(socialMediaAnchor).toHaveAttribute(
      'href',
      `${iconMapper[testData.type].href}/${[testData.id]}`
    );
  });
});
