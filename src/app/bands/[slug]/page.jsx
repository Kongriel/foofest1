"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const BandPage = () => {
  const [band, setBand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Properly receive searchParams and setSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Make sure searchParams is defined
    if (!searchParams) {
      console.log("searchParams is not initialized.");
      return; // Don't proceed further as searchParams are not ready
    }

    const slug = searchParams.get("slug");
    if (!slug) {
      setError("No band specified");
      setLoading(false);
      return;
    }

    const fetchURL = `https://winter-frill-lemon.glitch.me/bands/${encodeURIComponent(slug)}`;
    setLoading(true);

    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setBand(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch or parse data: ${error.message}`);
        setLoading(false);
      });
  }, [searchParams]); // Depend on searchParams to re-run effect when it's ready

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!band) return <div>No band data available.</div>;

  return (
    <div>
      <h1>{band.name}</h1>
      <p>{band.bio}</p>
    </div>
  );
};

export default BandPage;
