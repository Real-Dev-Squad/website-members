import { render, screen } from '@testing-library/react';
import Profile from '@components/member-profile';
import { TaskContextProvider } from '@store/tasks/tasks-context';

const notaMember = {
  roles: {
    archived: false,
  },
};

const isaMember = {
  roles: {
    archived: false,
    member: true,
  },
};
describe('Members Profile', () => {
  it('Should render member status properly', () => {
    render(
      <TaskContextProvider>
        <Profile membersData={notaMember} />
      </TaskContextProvider>
    );
    let memberStatus = screen.getByText('User is not a Member');
    expect(memberStatus).toBeInTheDocument();

    render(
      <TaskContextProvider>
        <Profile membersData={isaMember} />
      </TaskContextProvider>
    );

    memberStatus = screen.getByText('User is a Member');
    expect(memberStatus).toBeInTheDocument();
  });

  it('Should render the info icon correctly', () => {
    render(
      <TaskContextProvider>
        <Profile membersData={notaMember} />
      </TaskContextProvider>
    );
    const icon = screen.getByAltText('info icon');
    expect(icon).toBeDefined();
    expect(icon).toHaveAttribute('src', 'icons/info.png');
  });
});
