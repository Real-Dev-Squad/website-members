const baseURL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main';
const PRbaseURL = 'https://staging-api.realdevsquad.com/contributions';

/**
 *
 * @param {string} rdsId
 */
const getImgURL = (rdsId, img) => `${baseURL}/members/${rdsId}/${img}`;

/**
 *
 * @param {string} rdsId
 */
const getDataURL = (rdsId) => `${baseURL}/members/${rdsId}/data.json`;

/**
 *
 * @param {string} rdsId
 */
const getContributionsURL = (rdsId) => `${PRbaseURL}/${rdsId}`;

export { getImgURL, getDataURL, getContributionsURL };
