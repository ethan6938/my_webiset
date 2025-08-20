import React,{useMemo,useState} from "react";
import { getFinishDistance } from "./utils/constants";
import Menu from "./components/Menu";
import HUD from "./components/HUD";
import PhaserStage from "./stages/PhaserStage";
export default function App(){
  const [selectedTrack,setSelectedTrack]=useState("track");
  const [selectedCar,setSelectedCar]=useState("car");
  const [showMenu,setShowMenu]=useState(true);
  const [showHUD,setShowHUD]=useState(false);
  const [speed,setSpeed]=useState(0);
  const [game,setGame]=useState(null);
  const finishDistance=useMemo(()=>getFinishDistance(selectedTrack),[selectedTrack]);
  const handleStartFromMenu=()=>{setShowMenu(false);setShowHUD(true);};
  const handleGameReady=(g)=>setGame(g);
  const emit=(e)=>game?.events.emit(e);
  const startRace=()=>{if(!game)return;game.registry.set("gameStartedFlag",true);emit("start-game");};
  const restartRace=()=>{if(!game)return;setSpeed(0);game.registry.set("gameStartedFlag",false);emit("restart-game");};
  const backToMenu=()=>{setShowHUD(false);setShowMenu(true);setSpeed(0);setGame(null);};
  return(<div className="relative min-h-screen text-white" style={{background:"#111"}}>
    {showMenu && (<Menu selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} selectedCar={selectedCar} setSelectedCar={setSelectedCar} onStart={handleStartFromMenu} />)}
    {!showMenu && (<PhaserStage selectedTrack={selectedTrack} selectedCar={selectedCar} finishDistance={finishDistance} onSpeed={setSpeed} onReady={handleGameReady}>
      {showHUD && (<HUD speed={speed} onStart={startRace} onRestart={restartRace} onBack={backToMenu} disabled={!game} />)}
    </PhaserStage>)}
  </div>);
}
