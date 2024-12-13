type TagProps = {
  type: 'blue' | 'green' | 'silver'; // Dynamic status-based colors
  children: React.ReactNode; // Ensure that children are valid React nodes
};

export const Tag: React.FC<TagProps> = ({ type, children }) => {
  // Define colors based on the type prop
  const colorClass = `text-${type}-700 bg-${type}-100`;

  return (
    <span
      className={`w-fit rounded-full px-5 py-2 text-lg font-semibold uppercase ${colorClass}`}
    >
      {children}
    </span>
  );
};
