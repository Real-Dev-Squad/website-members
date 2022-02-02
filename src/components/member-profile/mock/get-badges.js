import badgesData from './data.json';

const imgBaseURL = badgesData.images.baseURL;

export default function getMemberBadges(memberId) {
  let memberBadges = badgesData[memberId];

  if (!memberBadges) {
    memberBadges = badgesData.default;
  }

  memberBadges = memberBadges.map((badge) => {
    return {
      title: badge.title,
      img: imgBaseURL + badgesData.images[badge.imgKey],
    };
  });

  return memberBadges;
}
