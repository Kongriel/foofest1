"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BandPage from "@/app/components/BandSlug";

export default function Band() {
  return (
    <div>
      <BandPage />
    </div>
  );
}
