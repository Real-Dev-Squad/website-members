const baseURL = `https://api.realdevsquad.com`;
const imgBaseURL = `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main`;
const getMembersURL = `${baseURL}/members`;

/**
 *
 * @param {string} rdsId
 */
const getImgURL = (rdsId, img) => `${imgBaseURL}/members/${rdsId}/${img}`;

/**
 *
 * @param {string} rdsId
 */
const getMembersDataURL = (rdsId) => `${baseURL}/users/${rdsId}`;

/**
 *
 * @param {string} rdsId
 */
const getContributionsURL = (rdsId) => `${baseURL}/contributions/${rdsId}`;

/**
 *
 * @param {string} rdsId
 */
const getActiveTasksURL = (rdsId) => `${baseURL}/tasks/${rdsId}?status=active`;

export {
  getImgURL,
  getMembersDataURL,
  getContributionsURL,
  getMembersURL,
  getActiveTasksURL,
};
