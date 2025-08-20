window.DR = window.DR || {}; window.DR.components = window.DR.components || {};

window.DR.components.Section = function Section({ title, children }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};
