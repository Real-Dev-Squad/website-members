import axios from 'axios';

/**
 * Used for network calls
 *
 * @param url {String} - API Endpoint URL
 * @param method {String} - API Call Method (GET, POST etc.)
 * @param params {Object} - Query Params for the API call
 * @param data {Object} - Body to be sent
 * @param headers {Object} - Headers to be sent
 * @param options {Object} - Options to be sent via axios
 */

const fetch = async (
  url,
  method = 'get',
  params = null,
  data = null,
  headers = null,
  options = null
) => {
  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers,
      ...options,
    });
    return response;
  } catch (err) {
    console.log('Something went wrong. Please contact admin', err);
    throw err;
  }
};

export { fetch };
