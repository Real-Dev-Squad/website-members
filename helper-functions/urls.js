const baseURL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main';

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

export { getImgURL, getDataURL, baseURL };
