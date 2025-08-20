window.DR = window.DR || {}; window.DR.components = window.DR.components || {};

window.DR.components.Section = function Section({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{title}</h2>
      {children}
    </div>
  );
};
