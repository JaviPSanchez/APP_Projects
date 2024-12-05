export interface SideNavigationItem {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}
