import routesData from '@/data/breadcrumbs.json';
import Link from 'next/link';
import { useMemo } from 'react';

function Breadcrumb({
  asPathNestedRoutes,
  pathnameNestedRoutes
}: {
  asPathNestedRoutes: string[];
  pathnameNestedRoutes: string[];
}) {
  const routes: { [key: string]: string } = routesData;
  const breadcrumbs = useMemo(() => {
    const crumbList = pathnameNestedRoutes.map((subpath, idx) => {
      const href = `/${asPathNestedRoutes
        .slice(0, idx + 1)
        .join('/')
        .replace('[', ':')
        .replace(']', '')}`;

      return {
        href,
        subpath: subpath,
        title:
          idx === 0
            ? subpath === '404' || subpath === '500'
              ? 'Error page'
              : subpath.replace('-', ' & ')
            : Object.keys(routes).includes(subpath)
              ? 'Manage'.concat(' ', subpath).replace('-', ' ')
              : subpath === '[id]'
                ? routes[pathnameNestedRoutes[idx - 1]].concat(' details').replace('-', ' ')
                : subpath === '[serviceId]'
                  ? 'Service details'
                  : subpath === '[enquiryId]'
                    ? 'Enquiry details'
                    : subpath === 'add'
                      ? subpath.concat(' ', routes[pathnameNestedRoutes[idx - 1]]).replace('-', ' ')
                      : subpath.replace('-', ' ')
      };
    });

    return [...crumbList];
  }, [pathnameNestedRoutes, asPathNestedRoutes]);

  return (
    <nav className="relative flex w-fit items-center justify-start">
      {breadcrumbs.length !== 0 ? (
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {breadcrumbs.map((c, idx, { length }) => (
            <div key={idx} className="flex space-x-1 md:space-x-3">
              {idx < length - 1 ? (
                <Link href={c.href}>
                  <li className="group whitespace-nowrap font-text text-lg font-bold uppercase text-gray-400 hover:text-blue md:text-xl lg:text-2xl">
                    {c.title}
                    <div className="mx-auto mt-1 h-px w-0 rounded-full bg-gray-400 duration-300 ease-in-out hover:text-blue group-hover:w-10" />
                  </li>
                </Link>
              ) : (
                <li className="group cursor-default whitespace-nowrap font-text text-lg font-bold uppercase text-blue md:text-xl lg:text-2xl">
                  {c.title}
                  <div className="h-px w-0" />
                </li>
              )}

              {idx !== length - 1 && <li className="font-text text-base lg:text-2xl">/</li>}
            </div>
          ))}
        </ol>
      ) : (
        <h2 className="whitespace-nowrap font-text text-base uppercase lg:text-2xl">Homepage</h2>
      )}
    </nav>
  );
}

export default Breadcrumb;
