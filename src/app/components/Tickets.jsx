"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Card from "../components/Card"; // Adjust the import based on your file structure

const Tickets = () => {
  const [campingOptions, setCampingOptions] = useState([]);
  const [reservationId, setReservationId] = useState(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const timerRef = useRef(null);
  const [isCampingAvailable, setIsCampingAvailable] = useState(true);

  const router = useRouter();
  const { ticketType } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      regularTickets: 0,
      vipTickets: 0,
      selectedOption: "",
      greenCamping: false,
      tent2Person: 0,
      tent3Person: 0,
    },
  });

  const regularTickets = watch("regularTickets");
  const vipTickets = watch("vipTickets");

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
        setIsCampingAvailable(data.some((option) => option.available > 0));
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

  useEffect(() => {
    if (ticketType === "regular") {
      setValue("regularTickets", regularTickets + 1);
    } else if (ticketType === "VIP") {
      setValue("vipTickets", vipTickets + 1);
    }
  }, [ticketType, setValue, regularTickets, vipTickets]);

  const reserveSpot = async (data) => {
    const payload = {
      area: data.selectedOption,
      amount: data.regularTickets + data.vipTickets,
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

      const responseData = await response.json();
      console.log("Reservation successful:", responseData); // Log successful reservation
      setReservationId(responseData.id);
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

  const onSubmit = async (data) => {
    if (validateForm(data)) {
      await reserveSpot(data);
      if (!error) {
        router.push("/personal-info");
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (data.regularTickets === 0 && data.vipTickets === 0) {
      errors.tickets = "At least one ticket must be selected.";
    }
    if (!data.selectedOption) {
      errors.camping = "A camping spot must be selected.";
    } else {
      const selectedCampingOption = campingOptions.find((option) => option.area === data.selectedOption);
      if (selectedCampingOption && selectedCampingOption.available === 0) {
        errors.camping = "Selected camping spot is not available.";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const totalCost = () => {
    const regularCost = regularTickets * 799;
    const vipCost = vipTickets * 1299;
    const campingCost = watch("greenCamping") ? 249 : 0;
    const tent2Cost = watch("tent2Person") * 299;
    const tent3Cost = watch("tent3Person") * 399;
    const bookingFee = 99;

    return regularCost + vipCost + campingCost + tent2Cost + tent3Cost + bookingFee;
  };

  return (
    <div className="min-h-screen text-bono-10 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl text-bono-10 font-bold mb-8">Select Your Tickets and Camping Options</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex space-x-4 mb-8">
        <Card title="Regular Ticket" status="Regular" subtitle="Subtitle" price="799" ticketType="regular" />
        <Card title="VIP Ticket" status="VIP" subtitle="Subtitle" price="1299" ticketType="VIP" />
      </div>
      <form className="bg-knap-10 p-8 rounded-lg shadow-lg w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">Regular Tickets (799,-)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setValue("regularTickets", Math.max(regularTickets - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{regularTickets}</div>
              <button type="button" onClick={() => setValue("regularTickets", regularTickets + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">VIP Tickets (1299,-)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setValue("vipTickets", Math.max(vipTickets - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{vipTickets}</div>
              <button type="button" onClick={() => setValue("vipTickets", vipTickets + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          {formErrors.tickets && <div className="text-red-500 mb-4 w-full text-center">{formErrors.tickets}</div>}
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">Prebook Camping Spot</label>
            <select {...register("selectedOption")} className="p-2 border border-gray-300 rounded">
              <option value="">Select a camping area</option>
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
            <Controller control={control} name="greenCamping" render={({ field }) => <input type="checkbox" {...field} className="form-checkbox h-5 w-5 text-blue-600" />} />
          </div>
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">2 Person Tent (299,- each)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setValue("tent2Person", Math.max(watch("tent2Person") - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{watch("tent2Person")}</div>
              <button type="button" onClick={() => setValue("tent2Person", watch("tent2Person") + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-lg text-bono-10">3 Person Tent (399,- each)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setValue("tent3Person", Math.max(watch("tent3Person") - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{watch("tent3Person")}</div>
              <button type="button" onClick={() => setValue("tent3Person", watch("tent3Person") + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-6 w-full">
            <p className="text-lg font-bold">Total Cost: {totalCost()},-</p>
            <p className="text-sm text-gray-500">* Includes a fixed booking fee of 99,-</p>
          </div>
          {reservationId && timeLeft > 0 && <p className="text-red-500 mb-4">You have {formatTime(timeLeft)} to complete your reservation.</p>}
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700" disabled={!isCampingAvailable}>
            {isSubmitSuccessful ? "Reservation Confirmed" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tickets;
