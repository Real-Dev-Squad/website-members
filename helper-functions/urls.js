const baseURL = 'https://staging-api.realdevsquad.com';
const baseImgURL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main';
const PRbaseURL = 'https://staging-api.realdevsquad.com/contributions';

/**
 *
 * @param {string} rdsId
 */
const getImgURL = (rdsId, img) => `${baseImgURL}/members/${rdsId}/${img}`;

/**
 *
 * @param {string} rdsId
 */
const getDataURL = (rdsId) => `${baseURL}/users/${rdsId}`;

/**
 *
 * @param {string} rdsId
 */
const getContributionsURL = (rdsId) => `${PRbaseURL}/${rdsId}`;

export { getImgURL, getDataURL, getContributionsURL };
