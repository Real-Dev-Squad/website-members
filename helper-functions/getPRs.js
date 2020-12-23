import { fetch } from './fetch';

const PRbaseURL = 'https://staging-api.realdevsquad.com/pullrequests/user';

const getPRsbyUser = async (rdsId) => {
  const res = await fetch(`${PRbaseURL}/${rdsId}`);
  const { pullRequests } = await res.data;
  return pullRequests;
};

export { getPRsbyUser };
