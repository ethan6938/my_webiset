window.DR = window.DR || {}; window.DR.components = window.DR.components || {};
const { Section, ChoiceImg } = window.DR.components;

window.DR.components.Menu = function Menu({ selectedTrack, setSelectedTrack, selectedCar, setSelectedCar, onStart }) {
  return (
    <div className="menu">
      <div className="section">
        <h2>Select Track</h2>
        <div className="choices">
          {[
            { key: "track",  label: "Easy",   img: "images/track.png" },
            { key: "track2", label: "Medium", img: "images/track2.png" },
            { key: "track3", label: "Hard",   img: "images/track3.png" },
          ].map(t => (
            <ChoiceImg key={t.key} src={t.img} alt={t.label}
              selected={selectedTrack === t.key}
              onClick={() => setSelectedTrack(t.key)} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Select Car</h2>
        <div className="choices">
          {[
            { key: "car",  label: "Car 1", img: "images/car.png" },
            { key: "car2", label: "Car 2", img: "images/car2.png" },
          ].map(c => (
            <ChoiceImg key={c.key} src={c.img} alt={c.label}
              selected={selectedCar === c.key}
              onClick={() => setSelectedCar(c.key)} />
          ))}
        </div>
      </div>

      <button type="button" onClick={() => { console.log('Start clicked'); onStart(); }} className="btn">Start Race</button>
    </div>
  );
};
