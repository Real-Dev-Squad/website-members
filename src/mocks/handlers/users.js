import { rest } from 'msw';
import { getUserProfileSelf } from '@helper-functions/urls';

export const usersHandlers = [
  rest.get(getUserProfileSelf, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'xpHuUkihhxPeWYfNe38L',
        incompleteUserDetails: false,
        roles: {
          archived: false,
          isMember: true,
        },
        linkedin_id: 'john-doe-91b673158',
        last_name: 'Doe',
        yoe: 1,
        github_display_name: 'Muralidhar',
        github_id: 'Muralidhar22',
        company: 'Real Dev Squad',
        designation: 'SDE-1',
        twitter_id: 'twitter_14',
        first_name: 'John',
        username: 'RDS Dev',
        status: 'idle',
        picture: {
          url: '/images/Avatar.png',
          publicId: 'profile/xpHuUkihhxPeWYfNe38L/ogirikotjnz8esjpm51v',
        },
      })
    );
  }),
];
