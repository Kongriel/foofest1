import React, { useState } from "react";

function Clubjoin() {
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setFormError("Navn is required");
      return;
    }
    if (!email) {
      setFormError("E-mail is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("E-mail is invalid");
      return;
    }
    setFormError("");
    // Submit the form
    alert("Form submitted successfully!");
  };

  return (
    <div className="text-bono-10 py-12 px-6 md:px-24 lg:px-36">
      <h1 className="text-4xl md:text-5xl font-bebas font-bold text-center mb-6">JOIN FOOCLUB</h1>
      <p className="text-center font-montserrat text-xl mb-8 w-full max-w-4xl mx-auto">Vil du være helt up to date på FOOFests nyheder og nyeste artistannonceringer? Vil du have mulighed for at deltage i konkurrencer i ny og næ, mens du får adgang til FOO Eventkalenderen hele året rundt? Så tilmeld dig FOOClub!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-12">
        <div className="text-center">
          <p className="font-semibold">ANNONCERING AF ARTISTER</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">SPÆNDENDE NYHEDER</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">INVITATION TIL AIA EVENTS</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">TILBUD FRA PARTNERE</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">UNIKKE KONKURRENCER</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">OG MEGET MERE...</p>
        </div>
      </div>

      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <input type="text" className="w-full lg:w-12/12 p-8 bg-knap-10 border border-gray-600 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Navn*" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)} required />
          <label className={`absolute left-4 top-4 text-bono-10 transition-all duration-200 ${nameFocused || name ? "transform -translate-y-3 scale-75" : ""}`} style={{ color: "#36454D" }}>
            Navn
          </label>
        </div>
        <div className="relative mb-4">
          <input type="email" className="w-full lg:w-128 p-8 bg-knap-10 border border-gray-600 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E-mail*" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} required />
          <label className={`absolute left-4 top-4 text-bono-10 transition-all duration-200 ${emailFocused || email ? "transform -translate-y-3 scale-75" : ""}`} style={{ color: "#36454D" }}>
            E-mail
          </label>
        </div>
        {formError && <div className="text-red-500 mb-4">{formError}</div>}
        <div className="mb-4 flex items-start">
          <input type="checkbox" className="mt-1 mr-2" required />
          <label className="text-sm">
            Jeg godkender FooFest{" "}
            <a href="#" className="text-blue-500 underline">
              persondatapolitik
            </a>
            . Vi gør opmærksom på, at FooFest er en +18 festival.
          </label>
        </div>
        <button type="submit" className="w-full p-12 font-bebas text-xl bg-knap-10 border border-gray-600 hover:border-gray-700 text-bono-10 font-bold rounded-xl cursor-pointer">
          TILMELD DIG FOOCLUB
        </button>
      </form>
    </div>
  );
}

export default Clubjoin;
