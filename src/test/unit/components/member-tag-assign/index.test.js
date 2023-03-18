import { render, screen } from '@testing-library/react';
import MemberTagAssign from '@components/member-tag-assign';

const tags = [
  {
    id: '123456543',
    name: 'tag1',
  },
  {
    id: '123lj456543',
    name: 'tag2',
  },
];

const levels = [
  {
    id: 'gtfrhsdgcj',
    name: 'level1',
  },
  {
    id: 'gdhfyhrjtfguj',
    name: 'level2',
  },
];

describe('Member tag assign', () => {
  it('Renders 1 button', () => {
    render(<MemberTagAssign userId="12345" levels={levels} tags={tags} />);
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(1);
  });

  it('Renders 2 select tags', () => {
    render(<MemberTagAssign userId="12345" levels={levels} tags={tags} />);
    const selectTags = screen.getAllByRole('combobox');
    expect(selectTags.length).toBe(2);
  });

  it('Renders 4 option tags', () => {
    render(<MemberTagAssign userId="12345" levels={levels} tags={tags} />);
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(4);
  });

  it('Checks if all options have passed values', () => {
    render(<MemberTagAssign userId="12345" levels={levels} tags={tags} />);
    const options = screen.getAllByRole('option');
    expect(options[0].value).toBe('123456543');
    expect(options[1].value).toBe('123lj456543');
    expect(options[2].value).toBe('gtfrhsdgcj');
    expect(options[3].value).toBe('gdhfyhrjtfguj');
  });
});
