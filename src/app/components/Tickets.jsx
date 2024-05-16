"use client";
import React, { useState, useEffect, useRef } from "react";

const Tickets = () => {
  const [regularTickets, setRegularTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [campingOptions, setCampingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [greenCamping, setGreenCamping] = useState(false);
  const [tent2Person, setTent2Person] = useState(0);
  const [tent3Person, setTent3Person] = useState(0);
  const [reservationId, setReservationId] = useState(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [formErrors, setFormErrors] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    fetch("https://winter-frill-lemon.glitch.me/available-spots")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCampingOptions(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    if (reservationId && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      releaseSpot();
    }

    return () => clearInterval(timerRef.current);
  }, [reservationId, timeLeft]);

  const reserveSpot = async () => {
    const payload = {
      area: selectedOption,
      amount: regularTickets + vipTickets,
    };

    console.log("Sending payload:", payload); // Log the payload

    try {
      const response = await fetch("https://winter-frill-lemon.glitch.me/reserve-spot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText); // Log the error response text
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Reservation successful:", data); // Log successful reservation
      setReservationId(data.id);
      setTimeLeft(300); // Reset timer to 5 minutes
    } catch (error) {
      console.error("Error occurred during reservation:", error); // Log the error
      setError(error.message);
    }
  };

  const releaseSpot = async () => {
    try {
      const response = await fetch("https://winter-frill-lemon.glitch.me/release-spot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reservationId,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setReservationId(null);
      setTimeLeft(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmReservation = async () => {
    try {
      const response = await fetch("https://winter-frill-lemon.glitch.me/fullfill-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reservationId,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setReservationConfirmed(true);
      clearInterval(timerRef.current); // Stop the timer
    } catch (error) {
      setError(error.message);
    }
  };

  const incrementRegular = () => setRegularTickets((prev) => prev + 1);
  const decrementRegular = () => setRegularTickets((prev) => Math.max(prev - 1, 0));
  const incrementVIP = () => setVipTickets((prev) => prev + 1);
  const decrementVIP = () => setVipTickets((prev) => Math.max(prev - 1, 0));
  const incrementTent2 = () => setTent2Person((prev) => prev + 1);
  const decrementTent2 = () => setTent2Person((prev) => Math.max(prev - 1, 0));
  const incrementTent3 = () => setTent3Person((prev) => prev + 1);
  const decrementTent3 = () => setTent3Person((prev) => Math.max(prev - 1, 0));

  const totalCost = () => {
    const regularCost = regularTickets * 799;
    const vipCost = vipTickets * 1299;
    const campingCost = greenCamping ? 249 : 0;
    const tent2Cost = tent2Person * 299;
    const tent3Cost = tent3Person * 399;
    const bookingFee = 99;

    return regularCost + vipCost + campingCost + tent2Cost + tent3Cost + bookingFee;
  };

  const validateForm = () => {
    const errors = {};
    if (regularTickets === 0 && vipTickets === 0) {
      errors.tickets = "At least one ticket must be selected.";
    }
    if (!selectedOption) {
      errors.camping = "A camping spot must be selected.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextClick = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await reserveSpot();
      // Programmatic navigation after a successful reservation
      if (!error) {
        window.location.href = "/personal-info";
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen text-bono-10 flex flex-col items-center justify-center bg-gray-50 py-10">
      <h1 className="text-4xl text-bono-10 font-bold mb-8">Select Your Tickets and Camping Options</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl" onSubmit={handleNextClick}>
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">Regular Tickets (799,-)</label>
            <div className="flex items-center">
              <button type="button" onClick={decrementRegular} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{regularTickets}</div>
              <button type="button" onClick={incrementRegular} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">VIP Tickets (1299,-)</label>
            <div className="flex items-center">
              <button type="button" onClick={decrementVIP} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{vipTickets}</div>
              <button type="button" onClick={incrementVIP} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          {formErrors.tickets && <div className="text-red-500 mb-4 w-full text-center">{formErrors.tickets}</div>}
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">Prebook Camping Spot</label>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="p-2 border border-gray-300 rounded">
              <option value="">Select an option</option>
              {campingOptions.map((option) => (
                <option key={option.area} value={option.area}>
                  {option.area} ({option.available} available spots)
                </option>
              ))}
            </select>
          </div>
          {formErrors.camping && <div className="text-red-500 mb-4 w-full text-center">{formErrors.camping}</div>}
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">Green Camping (249,-)</label>
            <input type="checkbox" checked={greenCamping} onChange={(e) => setGreenCamping(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />
          </div>
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">2 Person Tent (299,- each)</label>
            <div className="flex items-center">
              <button type="button" onClick={decrementTent2} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{tent2Person}</div>
              <button type="button" onClick={incrementTent2} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">3 Person Tent (399,- each)</label>
            <div className="flex items-center">
              <button type="button" onClick={decrementTent3} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{tent3Person}</div>
              <button type="button" onClick={incrementTent3} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-6 w-full">
            <p className="text-lg font-bold">Total Cost: {totalCost()},-</p>
            <p className="text-sm text-gray-500">* Includes a fixed booking fee of 99,-</p>
          </div>
          {reservationId && timeLeft > 0 && <p className="text-red-500 mb-4">You have {formatTime(timeLeft)} to complete your reservation.</p>}
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tickets;
