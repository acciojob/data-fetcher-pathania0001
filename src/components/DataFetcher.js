import React, { useEffect, useState } from "react";

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error("Network response was not ok");

        const result = await res.json();

        // Simulate "no data found" if products is empty
        if (!result || !result.products || result.products.length === 0) {
          setData([]);
        } else {
          setData(result.products);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>An error occurred: {error}</div>;

  if (Array.isArray(data) && data.length === 0) {
    return <div><pre>[]</pre></div>;
  }

  return (
    <div>
      <h2>Data Fetched from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;
