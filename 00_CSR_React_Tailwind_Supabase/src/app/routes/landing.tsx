import { Link } from 'react-router-dom';

import { Head } from '@/components/seo';

export const LandingRoute = () => {
  return (
    <>
      <Head description="Welcome to bulletproof react" />
      <div className="flex h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span>Landing</span>
          </h2>
          <div className="mt-6">
            <Link
              className=" h-10 w-full items-center rounded-lg bg-color-grey-200 p-2 text-base font-medium text-color-grey-600 hover:bg-color-grey-100 hover:text-color-brand-600"
              to="./app"
            >
              Main Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
