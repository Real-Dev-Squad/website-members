/**
 *
 * @param {string} rdsId
 */
const getImgURL = (rdsId) =>
  `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${rdsId}/img.png`;

/**
 *
 * @param {string} rdsId
 */
const getDataURL = (rdsId) =>
  `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${rdsId}/data.json`;

export { getImgURL, getDataURL };
