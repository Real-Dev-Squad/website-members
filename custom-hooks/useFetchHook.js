import { useState, useEffect } from 'react';

let defaults = {
  loading: false,
  error: undefined,
  data: undefined
};

/**
 * @param {string} url
 */
const useFetchHook = (url) => {
  let [loading, setLoading] = useState(defaults.loading);
  let [error, setError] = useState(defaults.error);
  let [data, setData] = useState(defaults.data);

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

        let response = await fetch(url);
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        let data = await response.json();

        setToData(data);
      } catch (e) {
        setToError(e);
      }
    };
    fetchUrl();
  }, []);
  return { loading, error, data };
};

export default useFetchHook;
