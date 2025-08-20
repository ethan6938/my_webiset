window.DR = window.DR || {}; window.DR.components = window.DR.components || {};

window.DR.components.ChoiceImg = function ChoiceImg({ src, selected, onClick, alt }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: '16px',
        border: `4px solid ${selected ? '#fff' : 'transparent'}`,
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      aria-pressed={selected}
    >
      <img src={src} alt={alt} style={{ width: '96px', height: '96px', objectFit: 'cover', display: 'block' }} />
    </button>
  );
};
