const PhaserStage = ({ onReady, children, ...props }) => {
  const mountRef = React.useRef(null);
  const gameRef = React.useRef(null);

  React.useEffect(() => {
    // Create custom canvas with willReadFrequently for Canvas path
    const root = mountRef.current;
    root.innerHTML = '';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    root.appendChild(canvas);

    const { selectedTrack, selectedCar, finishDistance, onSpeed } = props;
    const scene = new window.DRGame.DragRaceScene({ selectedTrack, selectedCar, finishDistance, onSpeed });

    const game = new window.Phaser.Game({
      type: window.Phaser.CANVAS,
      canvas, context,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#111',
      parent: root,
      physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
      scene,
      scale: { mode: window.Phaser.Scale.RESIZE, autoCenter: window.Phaser.Scale.CENTER_BOTH }
    });

    game.registry.set('gameStartedFlag', false);
    gameRef.current = game;
    onReady?.(game);

    const onResize = () => game.scale.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <>
      <div ref={mountRef} id="phaser-root" style={{ width: '100vw', height: '100vh' }} />
      {children}
    </>
  );
};
window.DRStages = Object.assign(window.DRStages || {}, { PhaserStage });
