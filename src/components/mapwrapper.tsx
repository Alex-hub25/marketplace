"use client";

import dynamic from "next/dynamic";

// Tell TS what props the dynamic Map will receive
const Map = dynamic<{ vendors: { id: number; name: string; position: [number, number] }[] }>(
  () => import("./map"),
  { ssr: false }
);

type Vendor = {
  id: number;
  name: string;
  position: [number, number];
};

export default function MapWrapper({ vendors }: { vendors: Vendor[] }) {
  return <Map vendors={vendors} />;
}

