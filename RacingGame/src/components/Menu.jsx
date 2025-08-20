import React from "react";
import Section from "./Section";
import ChoiceImg from "./ChoiceImg";

export default function Menu({ selectedTrack, setSelectedTrack, selectedCar, setSelectedCar, onStart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 z-20 bg-[#111]">
      <Section title="Select Track">
        <div className="flex gap-4 mt-2">
          {[
            { key: "track", label: "Easy", img: "/images/track.png" },
            { key: "track2", label: "Medium", img: "/images/track2.png" },
            { key: "track3", label: "Hard", img: "/images/track3.png" },
          ].map((t) => (
            <ChoiceImg key={t.key} src={t.img} alt={t.label} selected={selectedTrack === t.key} onClick={() => setSelectedTrack(t.key)} />
          ))}
        </div>
      </Section>

      <Section title="Select Car">
        <div className="flex gap-4 mt-2">
          {[
            { key: "car", label: "Car 1", img: "/images/car.png" },
            { key: "car2", label: "Car 2", img: "/images/car2.png" },
          ].map((c) => (
            <ChoiceImg key={c.key} src={c.img} alt={c.label} selected={selectedCar === c.key} onClick={() => setSelectedCar(c.key)} />
          ))}
        </div>
      </Section>

      <button onClick={onStart} className="px-7 py-3 text-lg rounded-xl bg-neutral-700 hover:bg-neutral-600 transition">
        Start Race
      </button>
    </div>
  );
}
