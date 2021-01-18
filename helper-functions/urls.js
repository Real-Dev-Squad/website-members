const baseURL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main';
const PRbaseURL = 'https://staging-api.realdevsquad.com/pullrequests/user';

/**
 *
 * @param {string} rdsId
 */
const getImgURL = (rdsId) => `${baseURL}/members/${rdsId}/img.png`;

/**
 *
 * @param {string} rdsId
 */
const getDataURL = (rdsId) => `${baseURL}/members/${rdsId}/data.json`;

/**
 *
 * @param {string} rdsId
 */
const getPRsUrl = (rdsId) => `${PRbaseURL}/${rdsId}`;

export { getImgURL, getDataURL, getPRsUrl };
