import { Raleway, Playfair_Display_SC } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-raleway'
});
export const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-playfair'
});
