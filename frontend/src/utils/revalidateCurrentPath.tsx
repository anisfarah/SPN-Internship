import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Revalidate the current path of the page.
 *
 * This function gets the current domain from the 'host' header and the current full URL from the 'referer' header.
 * It extracts the subpath from the full URL by finding the index of the current domain and adding its length to it.
 * Finally, it calls the `revalidatePath` function from `next/cache` with the subpath as an argument.
 *
 * @param {string} [domain] - The domain to use when calculating the subpath. If not specified, the domain is taken from the 'host' header.
 * @param {string} [fullUrl] - The full URL to use when calculating the subpath. If not specified, the full URL is taken from the 'referer' header.
 * @returns {void}
 */
export function revalidateCurrentPath(domain?: string, fullUrl?: string): void {
  const headersList = headers();
  const currentDomain = domain ?? headersList.get('host') ?? '';
  const currentFullUrl = fullUrl ?? headersList.get('referer') ?? '';

  const subpathIndex = currentFullUrl.indexOf(currentDomain) + currentDomain.length;
  const subpath = currentFullUrl.substring(subpathIndex);

  revalidatePath(subpath);
}

export function getCurrentPath() {
  const headersList = headers();
  const domain = headersList.get('host') || '';
  const fullUrl = headersList.get('referer') || '';
  const subpathIndex = fullUrl.indexOf(domain) + domain.length;
  const subpath = fullUrl.substring(subpathIndex);

  return subpath;
}

export function refreshCurrentPage() {
  const currentPath = getCurrentPath();
  const randomNumber = new Date().getTime();
  const params = new URLSearchParams(currentPath.split('?')[1]);
  params.set('refresh', randomNumber.toString());
  redirect(`${currentPath.split('?')[0]}?${params.toString()}`);
}
