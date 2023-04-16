import { rest } from 'msw';
import { getMembersURL } from '@helper-functions/urls';

export const membersHandlers = [
  rest.get(getMembersURL, (req, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        message: 'Members returned successfully!',
        members: [
          {
            id: '1butZN1HmIr0rwQmaVXp',
            incompleteUserDetails: false,
            roles: {
              archived: false,
              member: true,
            },
            linkedin_id: 'rohan-raj-gupta-1a3465190',
            last_name: 'Gupta',
            picture: {
              url: '/images/Avatar.png',
              publicId: 'profile/1butZN1HmIr0rwQmaVXp/ulqgyqehd79tc6g8akl2',
            },
            yoe: 0,
            instagram_id: '_.rohan09._',
            github_display_name: 'Rohan Raj Gupta',
            chaincode: '',
            github_id: 'rohan09-raj',
            company: 'Amity University',
            twitter_id: 'RohanRajGupta6',
            first_name: 'Rohan Raj',
            status: 'idle',
            username: 'rohan-rajgupta',
            isMember: true,
          },
          {
            id: '2LEt2spMNDUCpkjmbsfa',
            incompleteUserDetails: false,
            discordId: '984660276441939978',
            roles: {
              archived: false,
              member: true,
            },
            profileStatus: 'BLOCKED',
            last_name: 'Trivedi',
            linkedin_id: 'vinayak-trivedi-9b6212218',
            picture: {
              url: '/images/Avatar.png',
              publicId: 'profile/2LEt2spMNDUCpkjmbsfa/pmtjfsf2pmk1cdfxrtvr',
            },
            yoe: 0,
            instagram_id: '-',
            github_display_name: null,
            chaincode: '',
            github_id: 'vinayak-trivedi',
            company: 'Christ Church college',
            designation: 'Student',
            twitter_id: '_vnayak_',
            first_name: 'Vinayak',
            status: 'active',
            username: 'vinayak',
            isMember: true,
          },
          {
            id: '2WHsuYCJcewsGVLedd5F',
            incompleteUserDetails: true,
            github_display_name: null,
            roles: {
              archived: false,
            },
            github_id: 'sgloc009',
            isMember: false,
          },
          {
            id: 'soyeNVHijXArFDOvRgzm',
            incompleteUserDetails: false,
            roles: {
              archived: false,
              member: true,
            },
            linkedin_id: 'shashwat-bagaria-04671a16a',
            last_name: 'Bagaria',
            isMember: true,
            yoe: '1.5',
            picture: {
              publicId: 'profile/soyeNVHijXArFDOvRgzm/gukogvbxvemzhdhbuhub',
              url: '/images/Avatar.png',
            },
            github_display_name: 'Shashwat Bagaria',
            company_name: 'Sequoia Consulting Group',
            github_id: 'SBagaria2710',
            designation: 'Frontend Engineer (SDE1)',
            twitter_id: 'SBagaria2710',
            first_name: 'Shashwat',
            username: 'shashwat',
          },
          {
            id: 'xpHuUkihhxPeWYfNe38L',
            incompleteUserDetails: false,
            roles: {
              archived: false,
            },
            linkedin_id: 'muralidhar-akkireddy-91b673158',
            last_name: 'Akkireddy',
            yoe: 1,
            github_display_name: 'Muralidhar',
            github_id: 'Muralidhar22',
            company: 'Tata Consultancy Services',
            designation: 'Assistant Systems Engineer',
            twitter_id: 'murali_14',
            first_name: 'Muralidhar',
            username: 'muralidhar',
            status: 'idle',
            picture: {
              url: '/images/Avatar.png',
              publicId: 'profile/xpHuUkihhxPeWYfNe38L/ogirikotjnz8esjpm51v',
            },
            isMember: false,
          },
        ],
      })
    );
  }),
];
