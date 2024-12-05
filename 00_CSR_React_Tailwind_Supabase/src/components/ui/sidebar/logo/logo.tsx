import logo from '@/assets/logo-light.png';
import { Link } from '@/components/ui/link';

export const Logo = () => {
  return (
    <Link className="flex flex-col items-center text-white" to="/">
      <img className="mr-2 h-20 w-auto" src={logo} alt="Workflow" />
      {/* <span className="text-sm font-semibold text-color-grey-900">
        The Wild Oasis
      </span> */}
    </Link>
  );
};
