import React, { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/producs")
      .then((res) => res.json())
      .then((json) => {
          setData(json); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div>No data found</div>; 
  }

  return (
    <div>
      <h1>Data Fetched from API</h1>
      <pre>{JSON.stringify( data , null, 2)}</pre>

    </div>
  );
}

export default DataFetcher;
