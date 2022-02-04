/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';

const defaults = {
  loading: false,
  error: undefined,
  data: undefined,
};

/**
 * @param {string} url
 */
const useFetch = (url) => {
  const [loading, setLoading] = useState(defaults.loading);
  const [error, setError] = useState(defaults.error);
  const [data, setData] = useState(defaults.data);

  const setToLoading = () => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
  };

  const setToData = (data) => {
    setLoading(false);
    setData(data);
    setError(undefined);
  };

  const setToError = (errorMessage) => {
    setLoading(false);
    setData(undefined);
    setError(errorMessage);
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setToLoading();

        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        setToData(data);
      } catch (e) {
        setToError(e);
      }
    };
    fetchUrl();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
