import { ErrorProps } from '@/types/errors.type';
import Image from 'next/image';

import { Text, Category } from './texts';

/**
 * Renders an error component with the given error object.
 *
 * @param {Object} error - An object containing the error information.
 * @param {number | undefined} error.status - The HTTP status code of the error (optional).
 * @param {string | undefined} error.title - The title of the error (optional).
 * @param {string | undefined} error.description - The description of the error (optional).
 * @return {JSX.Element} The rendered error component.
 */
function ErrorComponent({ error }: { error: ErrorProps }): JSX.Element {
  return (
    <div className="mt-32 flex h-[calc(100vh-96px)] w-full flex-col items-center justify-start lg:mt-48 lg:px-6">
      <div className="relative mx-auto flex size-36 flex-col items-center justify-center">
        <Image alt="warning" className="relative" fill src="/images/error.svg" />
      </div>
      {error?.status && (
        <div className="my-10">
          <div className="relative mx-auto flex h-fit w-full flex-col items-center justify-center text-center">
            <Category>
              ERROR {error.status ?? '404'}: {error.title ?? 'Server unavailable'}
            </Category>
          </div>
          <div className="relative mx-auto flex h-fit w-full flex-col items-center justify-center text-center">
            <Text>{error.description ?? 'please try again later'}</Text>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyDataComponent() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <div className="relative aspect-square size-60">
        <Image
          src="/images/search.svg"
          fill
          alt=""
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        />
      </div>
      <Text>Sorry, there is nothing that matches your search</Text>
    </div>
  );
}

export default ErrorComponent;
export { EmptyDataComponent };
