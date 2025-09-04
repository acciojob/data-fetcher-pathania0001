import React, { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json)
        if (json && Array.isArray(json.products) && json.products.length > 0) {
          setData(json.products); 
        } else {
          setData([]); 
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  if (Array.isArray(data) && data.length === 0) {
    return <pre>[]</pre>; 
  }

  return (
    <div>
      <h2>Data Fetched from API</h2>
      <pre>{JSON.stringify({ products: data }, null, 2)}</pre>

    </div>
  );
}

export default DataFetcher;
