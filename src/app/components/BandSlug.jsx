import { useEffect } from "react";

useEffect(() => {
  console.log("Router or searchParams not initialized yet:", !searchParams);
  if (!searchParams) {
    return; // Early return if searchParams are not initialized
  }

  const bandSlug = searchParams.get("slug");
  console.log("Band Slug:", bandSlug);
  if (!bandSlug) {
    setError("No band specified");
    setLoading(false);
    return;
  }

  const fetchURL = `https://winter-frill-lemon.glitch.me/bands/${encodeURIComponent(bandSlug)}`;
  console.log("Fetch URL:", fetchURL);
  setLoading(true);
  fetch(fetchURL)
    .then((response) => {
      console.log("Fetch response received");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data loaded", data);
      setBand(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      setError(`Failed to fetch or parse data: ${error.message}`);
      setLoading(false);
    });
}, [searchParams]);
