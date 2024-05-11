import React, { useState, useEffect } from "react";
import Image from "next/image";

const Schedule = () => {
  const getCurrentDay = () => {
    const dayOfWeek = new Date().getDay(); // Sunday - 0, Monday - 1, etc.
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]; // Adjust order to match your schedule keys
    return days[dayOfWeek];
  };

  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [selectedScene, setSelectedScene] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBands = fetch("http://winter-frill-lemon.glitch.me/bands").then((res) => res.json());
    const fetchSchedule = fetch("http://winter-frill-lemon.glitch.me/schedule").then((res) => res.json());

    Promise.all([fetchBands, fetchSchedule])
      .then(([bandsData, scheduleData]) => {
        setBands(bandsData);
        setSchedule(scheduleData);
      })
      .catch((err) => {
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
      <div className="flex justify-center space-x-4 my-4">
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
          <button key={day} onClick={() => setSelectedDay(day)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {day.toUpperCase()}
          </button>
        ))}
        <select onChange={(e) => setSelectedScene(e.target.value)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <option value="">All Scenes</option>
          <option value="Main Stage">Main Stage</option>
          <option value="Midgard">Midgard</option>
          <option value="Vanaheim">Vanaheim</option>
          <option value="Jotunheim">Jotunheim</option>
        </select>
      </div>
      <h1 className="text-center text-5xl font-semibold text-bono-10 my-4">Festival Schedule for {selectedDay.toUpperCase()}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bandsForDayAndScene.map((band) => (
          <div key={band.slug} className="max-w-sm mx-auto bg-black rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-101">
            <div style={{ width: "450px", height: "450px", position: "relative" }}>
              <Image src={`/${band.logo}`} alt={`${band.name} logo`} layout="fill" objectFit="cover" />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-white">{band.name}</div>
              <p className="text-gray-400">
                Genre: {band.genre}
                <br />
                Time: {band.start} - {band.end} on {band.scene}
              </p>
            </div>
          </div>
        ))}
        {bandsForDayAndScene.length === 0 && <p className="text-center text-white">No bands scheduled for this day.</p>}
      </div>
    </div>
  );
};

export default Schedule;
