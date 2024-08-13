import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export function revalidateCurrentPath() {
  const headersList = headers();
  const domain = headersList.get('host') || '';
  const fullUrl = headersList.get('referer') || '';
  const subpathIndex = fullUrl.indexOf(domain) + domain.length;
  const subpath = fullUrl.substring(subpathIndex);

  revalidatePath(subpath);
}
