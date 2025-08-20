import { useCallback, useEffect, useRef } from "react";
import Phaser from "phaser";
import DragRaceScene from "../game/DragRaceScene";

export default function useDragRaceGame({ selectedTrack, selectedCar, finishDistance, onSpeed }) {
  const mountRef = useRef(null);
  const gameRef = useRef(null);

  const createGame = useCallback(() => {
    if (!mountRef.current) return;
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#111",
      parent: mountRef.current,
      physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
      scene: new DragRaceScene({ selectedTrack, selectedCar, finishDistance, onSpeed }),
      scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
    };
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
    gameRef.current = new Phaser.Game(config);
  }, [finishDistance, onSpeed, selectedCar, selectedTrack]);

  const destroyGame = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
  }, []);

  useEffect(() => () => destroyGame(), [destroyGame]);

  return { mountRef, gameRef, createGame, destroyGame };
}
