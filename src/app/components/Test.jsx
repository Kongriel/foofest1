import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ScheduleLoading from "./ScheduleLoading";

const Schedule = () => {
  const getCurrentDay = () => {
    const dayOfWeek = new Date().getDay();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[dayOfWeek];
  };

  const dayNames = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [selectedScene, setSelectedScene] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBands = fetch("https://winter-frill-lemon.glitch.me/bands").then((res) => res.json());
    const fetchSchedule = fetch("https://winter-frill-lemon.glitch.me/schedule").then((res) => res.json());

    Promise.all([fetchBands, fetchSchedule])
      .then(([bandsData, scheduleData]) => {
        setLoading(false);
        setBands(bandsData);
        setSchedule(scheduleData);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  const getBandsForDayAndScene = (day) => {
    return Object.entries(schedule).reduce((acc, [scene, days]) => {
      if (selectedScene && scene !== selectedScene) {
        return acc; // Skip scenes not matching the selected scene
      }
      const daySchedule = days[day];
      if (daySchedule) {
        daySchedule.forEach((slot) => {
          if (slot.act !== "break") {
            const band = bands.find((b) => b.name === slot.act);
            if (band) {
              acc.push({ ...band, scene, start: slot.start, end: slot.end });
            }
          }
        });
      }
      return acc;
    }, []);
  };

  const bandsForDayAndScene = selectedDay ? getBandsForDayAndScene(selectedDay) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold font-bebas text-bono-10 my-12">
        FOOFEST Schedule
        <span
          className="ml-2 sm:ml-4 font-bebas"
          style={{
            WebkitTextStroke: "1px black",
            color: "transparent",
          }}
        >
          {dayNames[selectedDay].toUpperCase()}
        </span>
      </h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
          <button key={day} onClick={() => setSelectedDay(day)} className="bg-knap-10 border-2 hover:border-blue-600 border-gray-500 rounded-lg text-bono-10 py-2 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base">
            {dayNames[day].toUpperCase()}
          </button>
        ))}

        <select id="scene-select" onChange={(e) => setSelectedScene(e.target.value)} className="bg-bono-10 border-2 text-white hover:border-blue-600 border-gray-500 rounded-lg py-2 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base focus:outline-none focus:border-blue-600" aria-label="Select a scene">
          <option value="">All Scenes</option>
          <option value="Midgard">MIDGARD</option>
          <option value="Vanaheim">VANAHEIM</option>
          <option value="Jotunheim">JOTUNHEIM</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <ScheduleLoading width="400px" height="370px" />
            <ScheduleLoading width="400px" height="370px" />
            <ScheduleLoading width="400px" height="370px" />
          </>
        ) : (
          bandsForDayAndScene.map((band) => (
            <Link key={band.slug} href={`/bands/${band.slug}`} passHref>
              <div className="max-w-sm mx-auto bg-knap-10 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-101 cursor-pointer">
                <div style={{ width: "400px", height: "370px", position: "relative" }}>
                  <Image src={band.logo.startsWith("http") ? band.logo : `/${band.logo}`} alt={`${band.name} logo`} layout="fill" objectFit="cover" />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-bono-10">{band.name}</div>
                  <p className="text-bono-10">
                    Genre: {band.genre}
                    <br />
                    Time: {band.start} - {band.end} on {band.scene}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
        {!loading && bandsForDayAndScene.length === 0 && <p className="text-center text-white">No bands scheduled for this day.</p>}
      </div>
    </div>
  );
};

export default Schedule;
