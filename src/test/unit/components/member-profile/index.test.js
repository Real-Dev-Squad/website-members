import { render, screen } from '@testing-library/react';
import Profile from '@components/member-profile';
import { TaskContextProvider } from '@store/tasks/tasks-context';
import { UserContextProvider } from '@store/user/user-context';
import { KeyboardProvider } from '@store/keyboard/context';

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

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      query: {
        dev: true,
      },
    }),
  };
});

describe('Members Profile', () => {
  it('Should render member status properly', () => {
    render(
      <KeyboardProvider
        initialValue={{
          isOptionKeyPressed: true,
          setIsOptionKeyPressed: jest.fn(),
        }}
      >
        <UserContextProvider value={initialUserContext}>
          <TaskContextProvider>
            <Profile membersData={notaMember} />
          </TaskContextProvider>
        </UserContextProvider>
      </KeyboardProvider>
    );

    let memberStatus = screen.getByText('User is not a Member');
    expect(memberStatus).toBeInTheDocument();

    render(
      <KeyboardProvider
        initialValue={{
          isOptionKeyPressed: true,
          setIsOptionKeyPressed: jest.fn(),
        }}
      >
        <UserContextProvider value={initialUserContext}>
          <TaskContextProvider>
            <Profile membersData={isaMember} />
          </TaskContextProvider>
        </UserContextProvider>
      </KeyboardProvider>
    );

    memberStatus = screen.getByText('User is a Member');
    expect(memberStatus).toBeInTheDocument();
  });

  it('Should render the info icon correctly', () => {
    render(
      <KeyboardProvider
        initialValue={{
          isOptionKeyPressed: true,
          setIsOptionKeyPressed: jest.fn(),
        }}
      >
        <UserContextProvider value={initialUserContext}>
          <TaskContextProvider>
            <Profile membersData={notaMember} />
          </TaskContextProvider>
        </UserContextProvider>
      </KeyboardProvider>
    );

    const icon = screen.getByAltText('info icon');
    expect(icon).toBeDefined();
    expect(icon).toHaveAttribute('src', 'icons/info.png');
  });
});
