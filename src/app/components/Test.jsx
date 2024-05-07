"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [bands, setBands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://winter-frill-lemon.glitch.me/bands", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setBands(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  return (
    <main>
      <h1>Welcome to Our Festival!</h1>
      {error && <p>Error loading band info: {error}</p>}
      {bands.length > 0 ? (
        bands.map((band) => (
          <div key={band.slug} className="band-container">
            <h2>Name: {band.name}</h2>
            <p>Genre: {band.genre}</p>
            <p>Members: {band.members.join(", ")}</p>
            <p>Bio: {band.bio}</p>
            <Image src={`/${band.logo}`} alt={`${band.name} logo`} width={302} height={403} priority={true} className="bg-white" />
            <p>
              Logo Credits:{" "}
              <a href={band.logoCredits} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </p>
          </div>
        ))
      ) : (
        <p>Loading band info...</p>
      )}
    </main>
  );
}
