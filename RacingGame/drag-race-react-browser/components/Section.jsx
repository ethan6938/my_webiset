const Section = ({ title, children }) => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);
window.DRComponents = Object.assign(window.DRComponents || {}, { Section });
