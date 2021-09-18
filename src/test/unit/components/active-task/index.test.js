import { render, screen } from '@testing-library/react';
import ActiveTask from '@components/member-profile/active-task';
import { timeWas } from '@helper-functions/time-was';
import { estimatedDays } from '@helper-functions/estimated-days';
import classNames from '@components/member-profile/active-task/active-task.module.scss';
import { percentageofDaysRemaining } from '@helper-functions/taskProgress';

describe('Active Taks', () => {
  const testActiveTaskComponent = (taskDetails) => {
    const percentOfTaskLeft = 100 - taskDetails.percentCompleted;
    const completedDate = timeWas(
      taskDetails.startedOn * 1000,
      false,
      taskDetails.endsOn * 1000
    );
    const remainingPercentageDays = percentageofDaysRemaining(
      taskDetails.startedOn,
      taskDetails.endsOn,
      completedDate
    );

    const expectedData = {
      completeDate: timeWas(
        taskDetails.startedOn * 1000,
        false,
        taskDetails.endsOn * 1000
      ),
      showEstimateDay: estimatedDays(
        remainingPercentageDays,
        percentOfTaskLeft,
        classNames
      ),
    };
    render(<ActiveTask taskDetails={taskDetails} />);

    const titleEl = screen.getByText(taskDetails.title);
    const purposeEl = screen.getByText(taskDetails.purpose);
    const completeDateEl = screen.getByTestId('completeDate');
    const percentageCompletedEl = screen.getByTestId('percentageCompleted');
    const progressIndicatorEl = screen.getByTestId('progressIndicator');
    const progressTextEl = screen.getByTestId('progressText');

    expect(titleEl).toHaveTextContent(taskDetails.title);
    expect(purposeEl).toHaveTextContent(taskDetails.purpose);
    expect(completeDateEl).toHaveTextContent(expectedData.completeDate);
    expect(percentageCompletedEl).toHaveTextContent(
      `${taskDetails.percentCompleted}% complete`
    );
    expect(progressIndicatorEl).toHaveStyle(
      `width: ${taskDetails.percentCompleted}%`
    );
    expect(progressTextEl).toHaveTextContent(
      taskDetails.percentCompleted > 0 ? 'This is in progress' : ''
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
