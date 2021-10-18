import { render, screen } from '@testing-library/react';
import ActiveTask from '@components/member-profile/active-task';
import { timeWas } from '@helper-functions/time-was';
import { estimatedDays } from '@helper-functions/estimated-days';
import classNames from '@components/member-profile/active-task/active-task.module.scss';
import { percentageofDaysRemaining } from '@helper-functions/taskProgress';

describe('Active Taks', () => {
  const testActiveTaskComponent = (taskDetails) => {
    const { title, purpose, percentCompleted, startedOn, endsOn } = taskDetails;

    const percentOfTaskLeft = 100 - percentCompleted;
    const completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
    const remainingPercentageDays = percentageofDaysRemaining(
      startedOn,
      endsOn,
      completedDate
    );

    const expectedData = {
      completeDate: timeWas(startedOn * 1000, false, endsOn * 1000),
      showEstimateDay: estimatedDays(
        remainingPercentageDays,
        percentOfTaskLeft,
        classNames
      ),
    };
    render(<ActiveTask taskDetails={taskDetails} />);

    const titleElement = screen.getByText(title);
    const purposeElement = screen.getByText(purpose);
    const completeDateElement = screen.getByTestId('completeDate');
    const percentageCompletedElement = screen.getByTestId(
      'percentageCompleted'
    );
    const progressIndicatorElement = screen.getByTestId('progressIndicator');
    const progressTextElement = screen.getByTestId('progressText');

    expect(titleElement).toHaveTextContent(title);
    expect(purposeElement).toHaveTextContent(purpose);
    expect(completeDateElement).toHaveTextContent(expectedData.completeDate);
    expect(percentageCompletedElement).toHaveTextContent(
      `${percentCompleted}% complete`
    );
    expect(progressIndicatorElement).toHaveStyle(`width: ${percentCompleted}%`);
    expect(progressTextElement).toHaveTextContent(
      percentCompleted > 0 ? 'This is in progress' : ''
    );
  };

  it('should render active-task for 60% completed task', () => {
    const taskDetail = {
      title: 'Test title',
      purpose: 'Test purpose',
      startedOn: '1624147200',
      endsOn: '1630397552',
      percentCompleted: 60,
    };

    testActiveTaskComponent(taskDetail);
  });

  it('should render active-task for 0% completed task', () => {
    const taskDetail = {
      title: 'Test title',
      purpose: 'Test purpose',
      startedOn: '1624147200',
      endsOn: '1630397552',
      percentCompleted: 0,
    };
    testActiveTaskComponent(taskDetail);
  });
});
