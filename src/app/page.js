"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Test from "./components/Test";
import Hero from "./components/Hero";
import HeroText from "./components/HeroText";

export default function Home() {
  return (
    <main>
      <HeroText />
      <Hero />
    </main>
  );
}
