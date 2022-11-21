import { render, screen } from '@testing-library/react';
import Profile from '@components/member-profile';
import { TaskContextProvider } from '@store/tasks/tasks-context';
import { UserContextProvider } from '@store/user/user-context';

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

const initialUserContext = {
  isSuperUser: true,
};

describe('Members Profile', () => {
  it('Should render member status properly', () => {
    render(
      <UserContextProvider value={initialUserContext}>
        <TaskContextProvider>
          <Profile membersData={notaMember} />
        </TaskContextProvider>
      </UserContextProvider>
    );

    let memberStatus = screen.getByText('User is not a Member');
    expect(memberStatus).toBeInTheDocument();
    render(
      <UserContextProvider value={initialUserContext}>
        <TaskContextProvider>
          <Profile membersData={isaMember} />
        </TaskContextProvider>
      </UserContextProvider>
    );

    memberStatus = screen.getByText('User is a Member');
    expect(memberStatus).toBeInTheDocument();
  });

  it('Should render the info icon correctly', () => {
    render(
      <UserContextProvider value={initialUserContext}>
        <TaskContextProvider>
          <Profile membersData={notaMember} />
        </TaskContextProvider>
      </UserContextProvider>
    );

    const icon = screen.getByAltText('info icon');
    expect(icon).toBeDefined();
    expect(icon).toHaveAttribute('src', 'icons/info.png');
  });
});
