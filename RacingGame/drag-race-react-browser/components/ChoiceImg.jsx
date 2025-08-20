const ChoiceImg = ({ src, selected, onClick, alt }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border-4 ${selected ? "border-white" : "border-transparent"} transition-transform hover:scale-105 overflow-hidden`}
    aria-pressed={selected}
  >
    <img src={src} alt={alt} className="w-24 h-24 object-cover block" />
  </button>
);
window.DRComponents = Object.assign(window.DRComponents || {}, { ChoiceImg });
