interface HeadingProps {
  type: 'h1' | 'h2' | 'h3';
  children: React.ReactNode; // Changed to use children instead of title
}

export const Heading: React.FC<HeadingProps> = ({ type, children }) => {
  const base = 'leading-14';

  const styles: Record<string, string> = {
    h1: base + ' text-2xl font-bold',
    h2: base + ' text-xl font-bold',
    h3: base + ' text-xl font-semibold',
  };

  const Tag = type; // Dynamically select the HTML tag

  return <Tag className={styles[type]}>{children}</Tag>;
};

export default Heading;
