import { fireEvent, render, screen } from '@testing-library/react';
import Profile from '@components/member-profile';
import { TaskContextProvider } from '@store/tasks/tasks-context';
import { UserContextProvider } from '@store/user/user-context';
import { KeyboardProvider } from '@store/keyboard/context';
import KeyboardHandler from '@components/keyboard-handler';

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
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('Should render  a member status properly', () => {
    render(
      <UserContextProvider value={initialUserContext}>
        <TaskContextProvider>
          <KeyboardProvider>
            <KeyboardHandler>
              <Profile membersData={isaMember} />
            </KeyboardHandler>
          </KeyboardProvider>
        </TaskContextProvider>
      </UserContextProvider>
    );
    fireEvent.keyDown(document, { key: 'Alt', code: 'AltLeft' });
    const memberStatus = screen.getByText('User is a Member');
    expect(memberStatus).toBeInTheDocument();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Should render not a member status properly', () => {
    render(
      <UserContextProvider value={initialUserContext}>
        <TaskContextProvider>
          <KeyboardProvider>
            <KeyboardHandler>
              <Profile membersData={notaMember} />
            </KeyboardHandler>
          </KeyboardProvider>
        </TaskContextProvider>
      </UserContextProvider>
    );
    fireEvent.keyDown(document, { key: 'Alt', code: 'AltLeft' });
    const memberStatus = screen.getByText('User is not a Member');
    expect(memberStatus).toBeInTheDocument();
  });

  it('Should render the info icon correctly', () => {
    render(
      <UserContextProvider value={initialUserContext}>
        <TaskContextProvider>
          <KeyboardProvider>
            <KeyboardHandler>
              <Profile membersData={notaMember} />
            </KeyboardHandler>
          </KeyboardProvider>
        </TaskContextProvider>
      </UserContextProvider>
    );

    const icon = screen.getByAltText('info icon');
    expect(icon).toBeDefined();
    expect(icon).toHaveAttribute('src', 'icons/info.png');
  });
});
