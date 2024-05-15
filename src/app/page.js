"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Test from "./components/Test";
import Hero from "./components/Hero";
import HeroText from "./components/HeroText";
import Knap1 from "./components/Knap1";
import Centertext from "./components/Centertext";
import Card from "./components/Card";

export default function Home() {
  return (
    <main>
      <section>
        <HeroText />
        <Hero />
      </section>
      <div className="flex justify-center mt-32 mb-44">
        <Knap1 />
      </div>
      <section>
        <Centertext />
      </section>
      <section className="flex flex-wrap justify-center items-center gap-8 w-fit p-12 mx-auto">
        <Card title="FOOFEST 24" status="REGULAR" price="799,00" />
        <Card title="FOOFEST 24" status="VIP" price="1299,00" />
      </section>
    </main>
    
  );
}
