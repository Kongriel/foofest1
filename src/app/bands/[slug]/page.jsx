"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const BandPage = () => {
  const [band, setBand] = useState(null);
  const [loadingBand, setLoadingBand] = useState(true);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const { slug } = useParams();

  const dayNames = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  useEffect(() => {
    if (!slug) {
      setError("No band specified");
      setLoadingBand(false);
      setLoadingSchedule(false);
      return;
    }

    const fetchBand = async () => {
      try {
        const response = await fetch(`https://winter-frill-lemon.glitch.me/bands/${encodeURIComponent(slug)}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setBand(data);
      } catch (error) {
        setError(`Failed to fetch or parse band data: ${error.message}`);
      } finally {
        setLoadingBand(false);
      }
    };

    fetchBand();
  }, [slug]);

  useEffect(() => {
    if (!band) return;

    const fetchSchedule = async () => {
      try {
        const response = await fetch(`https://winter-frill-lemon.glitch.me/schedule`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const bandSchedule = {};
        Object.entries(data).forEach(([stage, days]) => {
          Object.entries(days).forEach(([day, acts]) => {
            acts.forEach((act) => {
              if (act.act === band.name) {
                if (!bandSchedule[day]) {
                  bandSchedule[day] = [];
                }
                bandSchedule[day].push({ stage, ...act });
              }
            });
          });
        });
        setSchedule(bandSchedule);
      } catch (error) {
        setError(`Failed to fetch or parse schedule data: ${error.message}`);
      } finally {
        setLoadingSchedule(false);
      }
    };

    fetchSchedule();
  }, [band]);

  if (loadingBand || loadingSchedule) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!band) return <div>No band data available.</div>;

  const imageUrl = band.logo.startsWith("http") ? band.logo : `/${band.logo}`;

  return (
    <div>
      <h1>{band.name}</h1>
      <Image src={imageUrl} alt={band.name} width={500} height={500} />
      <p>{band.bio}</p>
      {schedule && (
        <div>
          <h2>Schedule</h2>
          {Object.entries(schedule).map(([day, acts]) => (
            <div key={day}>
              <h3>{dayNames[day]}</h3>
              <ul>
                {acts.map((act, index) => (
                  <li key={index}>
                    {act.start} - {act.end} at {act.stage}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BandPage;
