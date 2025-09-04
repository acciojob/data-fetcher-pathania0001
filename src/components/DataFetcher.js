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
        if (json && Array.isArray(json.products) && json.products.length > 0) {
          setData(json.products); // ✅ only keep the array
        } else {
          setData([]); // ✅ empty array if no products
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
    return <pre>[]</pre>; // ✅ Cypress expects exactly []
  }

  return (
    <div>
      <h2>Data Fetched from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* ✅ array only */}
    </div>
  );
}

export default DataFetcher;
