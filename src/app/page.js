"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Test from "./components/Test";
import Hero from "./components/Hero";
import HeroText from "./components/HeroText";
import Knap1 from "./components/Knap1";

export default function Home() {
  return (
    <main>
      <HeroText />
      <Hero />
      <div className="flex justify-center mt-10 mb-8">
        <Knap1 />
      </div>
    </main>
  );
}
