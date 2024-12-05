import { Logo } from './logo';
import { MainNav } from './main-nav';

export const SideBar = () => {
  return (
    <aside className=" row-span-full flex flex-col gap-14 border-r border-color-grey-100 bg-color-grey-0 p-4">
      <Logo />
      <MainNav />
    </aside>
  );
};
