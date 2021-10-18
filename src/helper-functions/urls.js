const baseURL = `https://api.realdevsquad.com`;
const imgBaseURL = `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main`;
const getMembersURL = `${baseURL}/members`;
const cloudinaryImageUrl = `https://res.cloudinary.com/realdevsquad/image/upload`;
const walletURL = `${baseURL}/wallet`;
const CURRENCIES = {
  NEELAM: 'neelam',
  DINERO: 'dinero',
};

/**
 *
 * @param {string} rdsId
 */
const getImgURL = (rdsId, img) => `${imgBaseURL}/members/${rdsId}/${img}`;

/**
 *
 * @param {string} publicId cloudinary image id
 * @param {string} configs options for image such as width, height, image type
 */
const getCloudinaryImgURL = (publicId, configs) =>
  `${cloudinaryImageUrl}${configs ? `/${configs}` : ''}/${publicId}`;

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
  getCloudinaryImgURL,
  getActiveTasksURL,
  walletURL,
  CURRENCIES,
};
