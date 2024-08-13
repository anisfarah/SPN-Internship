import { Metadata } from 'next';
import { Suspense } from 'react';

import { playfairDisplaySC, raleway } from '@/styles/fonts';
import '@/styles/globals.css';

import Layout from '@/components/ui/layout';

export const metadata: Metadata = {
  title: 'SPN Dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-base lg:text-[0.7rem] xl:text-[0.8rem] 2xl:text-base">
      <body className={`${playfairDisplaySC.variable} ${raleway.variable} font-light`}>
        <Suspense>
          <Layout> {children} </Layout>
        </Suspense>
      </body>
    </html>
  );
}
