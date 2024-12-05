// Fonts
import { Space_Grotesk } from "next/font/google";
import "../../app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

interface HeaderProps {
  label?: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex-center flex-col gap-y-4">
      <h1 className={`text-3xl font-semibold ${spaceGrotesk.variable}`}>
        🔐 Auth
      </h1>

      <p className=" text-sm">{label}</p>
    </div>
  );
};

export default Header;
