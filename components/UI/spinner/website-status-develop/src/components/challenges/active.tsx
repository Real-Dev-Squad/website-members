import { FC, useState } from 'react';
import Card from '@/components/Card/index';
import details from '@/components/challenges/details';
import participantsDetails from '@/components/challenges/participants';

type ActiveProps = {
  content: {
    id: number;
    title: string;
    level: string;
    start_date: string;
    end_date: string;
    participants: {
      user_id: string;
      first_name: string;
      last_name: string;
      yoe: number;
      company: string;
      designation: string;
      img: string;
      github_id: string;
      linkedin_id: string;
      twitter_id: string;
      instagram_id: string;
      is_member: number;
      rds_member_id: string;
    }[];
    is_active: boolean;
    is_user_subscribed: number;
  };
};

const Active: FC<ActiveProps> = ({ content }) => {
  const [isUserSubscribed, setUserSubscribed] = useState(content.is_user_subscribed);

  return (
    <Card
      title={{ text: content.title }}
      data={details(content)}
      participants={participantsDetails(content)}
      button={
        {
          text: 'I will do this',
          onClick: () => {
            if (!isUserSubscribed) {
              (setUserSubscribed(1));
            }
          },
        }
      }
      key={content.title}
    />
  );
};

export default Active;
