import React, { useEffect } from "react";
import useDragRaceGame from "../hooks/useDragRaceGame";

export default function PhaserStage({ onReady, children, ...hookProps }) {
  const { mountRef, gameRef, createGame } = useDragRaceGame(hookProps);

  useEffect(() => {
    createGame();
    onReady?.(gameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={mountRef} className="block" style={{ width: "100vw", height: "100vh" }} />
      {children}
    </>
  );
}
