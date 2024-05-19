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
  const [currentStage, setCurrentStage] = useState(null);

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

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const checkIfLive = (schedule, bandName) => {
    const currentTime = getCurrentTime();
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();

    if (schedule[today]) {
      for (const act of schedule[today]) {
        if (act.act === bandName && currentTime >= act.start && currentTime < act.end) {
          return act.stage;
        }
      }
    }
    return null;
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

        // Check if the band is currently live
        const stage = checkIfLive(bandSchedule, band.name);
        setCurrentStage(stage);
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

  // Get the days the band is playing
  const playingDays = schedule ? Object.keys(schedule).map((day) => dayNames[day]) : [];

  return (
    <div className="flex flex-col mt-12 items-center justify-center ">
      <div className="flex flex-col items-center text-center relative">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-7xl text-bono-10 font-bold">
            {band.name}
            {playingDays.length > 0 && (
              <span
                className="ml-4"
                style={{
                  WebkitTextStroke: "1px black",
                  color: "transparent",
                }}
              >
                {playingDays.join(", ")}
              </span>
            )}
          </h1>
          {currentStage && <div className="absolute top-0 right-0 bg-green-500 text-white text-sm font-bold rounded-full px-4 py-1">Live at {currentStage} right now</div>}
        </div>
        <div className="mb-4 mt-8">
          <Image src={imageUrl} alt={band.name} width={500} height={500} className="rounded-xl" />
        </div>
        <p className="mt-4 w-9/12 text-bono-10 text-lg font-montserrat">{band.bio}</p>
        {schedule && (
          <div className="mt-6">
            {Object.entries(schedule).map(([day, acts]) => (
              <div key={day}>
                <ul>
                  {acts.map((act, index) => (
                    <li className="text-bono-10 text-lg font-montserrat mb-8" key={index}>
                      {act.start} - {act.end} at {act.stage}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BandPage;
