const HUD = ({ speed, onStart, onRestart, onBack, disabled }) => (
  <div id="hud">
    <div id="speedometer">Speed: {speed} km/h</div>
    <button className="hud-btn" onClick={onStart} disabled={disabled}>Start</button>
    <button className="hud-btn" onClick={onRestart} disabled={disabled}>Restart</button>
    <button className="hud-btn" onClick={onBack}>Back</button>
  </div>
);
window.DRComponents = Object.assign(window.DRComponents || {}, { HUD });
