import { Link } from 'react-router-dom';
import BaseButtonLink from '~base/BaseButtonLink';

export function Component() {
  return (
    <main className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-amber-600">Error</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
          Registration Data Error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-400">
          There was an issue loading your registration data. This might be due to missing or invalid contest information.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <BaseButtonLink to="/">Go back home</BaseButtonLink>
          <Link to="/contests" className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors">
            Browse contests
          </Link>
        </div>
      </div>
    </main>
  );
}

Component.displayName = 'RegistrationsError';

export default Component;
