const { Menu, HUD } = window.DRComponents;
const { PhaserStage } = window.DRStages;
const { getFinishDistance } = window.DRUtils;

const App = () => {
  const [selectedTrack, setSelectedTrack] = React.useState('track');
  const [selectedCar, setSelectedCar] = React.useState('car');
  const [showMenu, setShowMenu] = React.useState(true);
  const [speed, setSpeed] = React.useState(0);
  const [game, setGame] = React.useState(null);

  const finishDistance = React.useMemo(() => getFinishDistance(selectedTrack), [selectedTrack]);

  const handleStartFromMenu = () => {
    setShowMenu(false);
  };

  const handleGameReady = (gameInstance) => setGame(gameInstance);

  const emit = (evt) => game?.events.emit(evt);
  const startRace = () => {
    if (!game) return;
    game.registry.set('gameStartedFlag', true);
    emit('start-game');
  };
  const restartRace = () => {
    if (!game) return;
    setSpeed(0);
    game.registry.set('gameStartedFlag', false);
    emit('restart-game');
  };
  const backToMenu = () => {
    setShowMenu(true);
    setSpeed(0);
    setGame(null);
  };

  return (
    <div className="relative min-h-screen text-white" style={{ background: '#111' }}>
      {showMenu ? (
        <Menu
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          onStart={handleStartFromMenu}
        />
      ) : (
        <PhaserStage
          selectedTrack={selectedTrack}
          selectedCar={selectedCar}
          finishDistance={finishDistance}
          onSpeed={setSpeed}
          onReady={handleGameReady}
        >
          <HUD
            speed={speed}
            onStart={startRace}
            onRestart={restartRace}
            onBack={backToMenu}
            disabled={!game}
          />
        </PhaserStage>
      )}
    </div>
  );
};

window.DRApp = { App };
