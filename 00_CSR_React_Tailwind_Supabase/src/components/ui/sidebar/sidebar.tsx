import { Logo } from '@/components/ui/sidebar/logo';
import { MainNav } from '@/components/ui/sidebar/main-nav';
import { Uploader } from '@/utils/uploader';

export const SideBar = () => {
  return (
    <aside className="row-span-full flex flex-col gap-14 border-r border-color-grey-100 bg-color-grey-0 p-4">
      <Logo />
      <MainNav />
      <Uploader />
    </aside>
  );
};
