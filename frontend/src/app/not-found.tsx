import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Not Found - SPN Dashboard'
  };
}

export default async function NotFound() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-14">
      <h1 className="font-text text-3xl font-thin">Page not found</h1>
      <p className="max-w-3xl text-center text-lg font-extralight">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="relative size-64">
        <Image src="/images/error.svg" fill alt="Page not found" />
      </div>
      <Link href="/" className="font-medium underline">
        Return Home
      </Link>
    </main>
  );
}
