import React from "react";

export default function HUD({ speed, onStart, onRestart, onBack, disabled }) {
  return (
    <div className="absolute top-5 left-5 z-30 flex flex-col gap-3">
      <div className="font-mono text-base bg-black/40 px-3 py-2 rounded-lg">Speed: {speed} km/h</div>
      <div className="flex gap-2">
        <button className="font-mono text-sm text-white bg-black/40 px-3 py-2 border-2 border-white rounded-lg disabled:opacity-50" onClick={onStart} disabled={disabled}>
          Start
        </button>
        <button className="font-mono text-sm text-white bg-black/40 px-3 py-2 border-2 border-white rounded-lg disabled:opacity-50" onClick={onRestart} disabled={disabled}>
          Restart
        </button>
        <button className="font-mono text-sm text-white bg-black/40 px-3 py-2 border-2 border-white rounded-lg" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
