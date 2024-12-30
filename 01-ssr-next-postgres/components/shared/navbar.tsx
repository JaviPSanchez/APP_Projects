"use client";

import UserButton from "@/components/auth/user-button";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Theme from "@/components/shared/theme";
import MobileNav from "@/components/shared/mobile-nav";
import GlobalSearch from "@/components/shared/global-search";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <div className="flex gap-x-2">
        {/* <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/server">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/server">Admin</Link>
        </Button> */}

        <Link href="/home" className="flex items-center gap-1">
          <Image
            src="/assets/images/logo.png"
            width={23}
            height={23}
            alt="DevFlow"
          />

          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
            Atalaya <span className="text-primary-500">Digital</span>
          </p>
        </Link>
      </div>
      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />
        <UserButton />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
