"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SlugLoading from "@/app/components/SlugLoading";

const BandPage = () => {
  const [band, setBand] = useState(null);
  const [loadingBand, setLoadingBand] = useState(true);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [similarBands, setSimilarBands] = useState([]);
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
        const stage = checkIfLive(bandSchedule, band.name);
        setCurrentStage(stage);
      } catch (error) {
        setError(`Failed to fetch or parse schedule data: ${error.message}`);
      } finally {
        setLoadingSchedule(false);
      }
    };

    const fetchSimilarBands = async () => {
      try {
        const response = await fetch(`https://winter-frill-lemon.glitch.me/bands`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const allBands = await response.json();
        const filteredBands = allBands.filter((b) => b.genre === band.genre && b.slug !== band.slug).slice(0, 4);
        setSimilarBands(filteredBands);
      } catch (error) {
        setError(`Failed to fetch or parse similar bands: ${error.message}`);
      }
    };

    fetchSchedule();
    fetchSimilarBands();
  }, [band]);

  if (loadingBand || loadingSchedule) {
    return (
      <div className="flex flex-col mt-12 items-center justify-center">
        <div className="flex flex-col items-center text-center relative">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <SlugLoading width="w-96" height="h-16" extraClass="rounded-full" />
          </div>
          <SlugLoading width="w-64" height="h-64" extraClass="mb-4 mt-8 rounded-xl" />
          <SlugLoading width="w-3/4" height="h-16" extraClass="mt-4" />
          <SlugLoading width="w-full" height="h-16" extraClass="mt-6" />
          <SlugLoading width="w-full" height="h-16" extraClass="mt-6" />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!band) return <div>No band data available.</div>;

  const imageUrl = band.logo.startsWith("http") ? band.logo : `/${band.logo}`;

  const playingDays = schedule ? Object.keys(schedule).map((day) => dayNames[day]) : [];

  return (
    <div className="flex flex-col mt-24 md:mt-40 items-center justify-center px-4 md:px-8 lg:px-12">
      <div className="flex flex-col items-center text-center relative">
        <div className="flex flex-col items-center space-y-4 mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-bono-10 font-bold">
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
        </div>
        {currentStage && <div className="bg-green-500 text-white text-sm font-bold rounded-full px-4 py-1 mt-4">Live at {currentStage} right now</div>}
        <div className="mb-4 mt-8 w-64 h-64 md:w-96 md:h-96 lg:w-500 lg:h-500 relative">
          <Image src={imageUrl} alt={band.name} layout="fill" className="rounded-xl" objectFit="cover" />
        </div>
        <p className="mt-4 w-full md:w-9/12 text-bono-10 px-4 text-base md:text-lg font-montserrat">{band.bio}</p>
        {schedule && (
          <div className="mt-6 w-full md:w-9/12">
            {Object.entries(schedule).map(([day, acts]) => (
              <div key={day} className="mb-4">
                <ul>
                  {acts.map((act, index) => (
                    <li className="text-bono-10 text-base md:text-lg font-montserrat mb-2" key={index}>
                      {act.start} - {act.end} at {act.stage}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* New section to display similar bands */}
      <div className="mt-12 w-full text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-bono-10">More bands in the same genre</h2>
        <div className="flex flex-col md:flex-row justify-center flex-wrap gap-8 mb-10">
          {similarBands.map((similarBand) => (
            <Link key={similarBand.slug} href={`/bands/${similarBand.slug}`} passHref>
              <div className="max-w-xs mx-auto bg-knap-10 rounded-lg overflow-hidden shadow-lg transform transition duration-500 cursor-pointer">
                <div style={{ width: "300px", height: "300px", position: "relative" }}>
                  <Image src={similarBand.logo.startsWith("http") ? similarBand.logo : `/${similarBand.logo}`} alt={`${similarBand.name} logo`} layout="fill" objectFit="cover" />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-lg md:text-xl mb-2 text-bono-10">{similarBand.name}</div>
                  <p className="text-bono-10">Genre: {similarBand.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BandPage;
