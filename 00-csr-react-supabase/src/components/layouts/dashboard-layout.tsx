import { Header } from '@/components/ui/header';
import { SideBar } from '@/components/ui/sidebar';

import { DashboardLayoutProps } from './types';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="grid min-h-screen grid-cols-dashboard-layout grid-rows-dashboard-layout">
      <Header />
      <SideBar />
      <main className=" bg-color-grey-50 p-4">
        <div className="mx-auto max-w-[120rem]">{children}</div>
      </main>
    </div>
  );
};
