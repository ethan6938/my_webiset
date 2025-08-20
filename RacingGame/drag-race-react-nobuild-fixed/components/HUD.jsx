window.DR = window.DR || {}; window.DR.components = window.DR.components || {};

window.DR.components.HUD = function HUD({ speed, onStart, onRestart, onBack, disabled }) {
  return (
    <div id="hud">
      <div id="speedometer">Speed: {speed} km/h</div>
      <button className="hud-btn" type="button" onClick={onStart} disabled={disabled}>Start</button>
      <button className="hud-btn" type="button" onClick={onRestart} disabled={disabled}>Restart</button>
      <button className="hud-btn" type="button" onClick={onBack}>Back</button>
    </div>
  );
};
