import { render, screen } from '@testing-library/react';
import Profile from '@components/member-profile';
import { TaskContextProvider } from '@store/tasks/tasks-context';
import { UserContextProvider } from '@store/user/user-context';
import { KeyboardProvider } from '@store/keyboard/context';
import MemberRoleUpdate from '@components/member-role-update';
import {
  emptyActiveTasksError,
  emptyContributionsError,
  emptyNoteworthyContributionsError,
} from '@constants/error-messages';

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
  showMemberRoleUpdateModal: true,
};
const activeTasks = {
  tasks: [],
};
const contributions = {
  noteworthy: [],
  all: [],
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
  let portalContainer;

  beforeEach(() => {
    portalContainer = document.createElement('div');
    portalContainer.id = 'memberRoleUpdateModal'; // Make sure it has the same ID as in your component
    document.body.appendChild(portalContainer);
  });

  afterEach(() => {
    // Clean up the portal container after each test
    document.body.removeChild(portalContainer);
  });
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
  it('Should render empty error message if no data inside accordion sections', () => {
    render(
      <KeyboardProvider
        initialValue={{
          isOptionKeyPressed: true,
          setIsOptionKeyPressed: jest.fn(),
        }}
      >
        <UserContextProvider value={initialUserContext}>
          <TaskContextProvider>
            <Profile
              membersData={isaMember}
              devUser
              activeTasks={activeTasks}
              contributions={contributions}
            />
          </TaskContextProvider>
        </UserContextProvider>
      </KeyboardProvider>
    );
    const emptyActiveTasksErrorElement = screen.getByText(
      emptyActiveTasksError
    );
    expect(emptyActiveTasksErrorElement).toBeInTheDocument();
    const emptyContributionsErrorElement = screen.getByText(
      emptyContributionsError
    );
    expect(emptyContributionsErrorElement).toBeInTheDocument();
    const emptyNoteworthyContributionsErrorElement = screen.getByText(
      emptyNoteworthyContributionsError
    );
    expect(emptyNoteworthyContributionsErrorElement).toBeInTheDocument();
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
  it('Should render memberRoleUpdateModal', () => {
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

    const memberRoleUpdateModal = screen.getByTestId('memberRoleUpdateModal');
    expect(memberRoleUpdateModal).toBeInTheDocument();
  });
  it('renders the button in the MemberRoleUpdate', () => {
    render(
      <KeyboardProvider
        initialValue={{
          isOptionKeyPressed: true,
          setIsOptionKeyPressed: jest.fn(),
        }}
      >
        <UserContextProvider value={initialUserContext}>
          <MemberRoleUpdate />
        </UserContextProvider>
      </KeyboardProvider>
    );

    const promoteButton = screen.getByTestId('promoteDemoteButton');
    const archiveUnarchiveButton = screen.getByTestId('archiveUnArchiveButton');
    expect(promoteButton).toBeInTheDocument();
    expect(promoteButton.textContent).toEqual('Promote to Member');
    expect(archiveUnarchiveButton).toBeInTheDocument();
    expect(archiveUnarchiveButton.textContent).toEqual('Archive Member');
  });
  it('Should render the reason text box in the MemberRoleUpdate, when ?dev=true in the query', () => {
    render(
      <KeyboardProvider
        initialValue={{
          isOptionKeyPressed: true,
          setIsOptionKeyPressed: jest.fn(),
        }}
      >
        <UserContextProvider value={initialUserContext}>
          <MemberRoleUpdate />
        </UserContextProvider>
      </KeyboardProvider>
    );

    const archiveUnarchiveButton = screen.getByTestId('archiveUnArchiveButton');
    const reasonTextBox = screen.getByTestId('reasonTextBox');
    const reasonInputLabel = screen.getByTestId('reasonInputLabel');

    expect(archiveUnarchiveButton).toBeInTheDocument();
    expect(archiveUnarchiveButton.textContent).toEqual('Archive Member');
    expect(reasonInputLabel.textContent).toEqual('Reason:');
    expect(reasonTextBox).toBeInTheDocument();
    expect(reasonTextBox).toHaveAttribute(
      'placeholder',
      'Enter the reason for archiving the user'
    );
  });
});
