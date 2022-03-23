import { useEffect, useState } from "react";

const useHTTP = (cardObj) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const prepData = (rawData) => {
    const formattedData = rawData.data[0];
    return formattedData;
  };

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(cardObj.url);

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const fetchedData = await response.json();
        const preppedData = await prepData(fetchedData);

        setData(preppedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [cardObj.url]);

  return { data, error, loading };
};

export default useHTTP;
