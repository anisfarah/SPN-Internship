import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        grayBgProfile: '#E4E4E5',
        outline: '#C7D2F9',
        green: '#10931D',
        greenAccent: '#CAE6CB',
        red: '#F20000',
        redAccent: '#FCC6C5',
        yellow: '#E1CA00',
        yellowAccent: '#FFFFBF',
        blue: '#3BB2E6',
        blueAccent: '#D4EDF8',
        brown: '#E6A23B',
        brownAccent: '#FAEAD2',
        orange: '#FF4E00',
        orangeAccent: '#FFC59A',
        orangePing: '#FFBB34',
        pink: '#FF006F',
        pinkAccent: '#FFB0D2',
        purple: '#C280BC',
        purpleAccent: '#ECB8E6',
        grey: '#707070',
        greyAccent: '#D4D4D4',
        turquoise: '#719589',
        turquoiseAccent: '#C6E8E2',
        textColor: '#000000',
        bgColor: '#EEF1F7',
        bgColorHover: '#DAE7F1',
        grayProfile: '#9C9C9C',
        grayUserActivity: '#E8EDF2',
        grayAccent: '#C9C9C9',
        blackAccent: '#C6C6C6',
        bgGray: '#EEEEEE',
        // primary: '#C19A51',
        bgButton: '#D7E6F0',
        primary: '#98C4EC',
        primaryAccent: '#C19A51',
        selectedColor: '#DEE9F6',
        secondary: '#D9D9D9',
        secondaryAccent: '#FFFFFF',
        subtitleGrey: '#ACACAC',
        inputLabelAccent: '#8A8A8A',
        toggleAccent: '#D5D5D5',
        //Request Status :
        // Existing colors...
        newBlue: '#D4EDF8',
        newGreen: '#CAE6CB',
        newBrown: '#FAEAD2',
        newRed: '#FCC6C5',
        newYello: '#FFFFBF', // Typo in the original list fixed (Yellow)
        newOrange: '#FFC59A', // Background for orange

        textBlue: '#3BB2E6',
        textGreen: '#10931D',
        textBrown: '#E6A23B',
        textRed: '#F20000',
        textYellow: '#E1CA00',
        textOrange: '#FF4E00' // Text color for orange
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', ...defaultTheme.fontFamily.sans],
        text: ['var(--font-raleway)', ...defaultTheme.fontFamily.sans],
        PlayfairDisplaySC: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif],
        title: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif]
      },
      boxShadow: {
        innerOLD:
          'inset 5px 6px 12px rgba(198,204,225,.5),inset -5px -6px 16px rgba(255,255,255,.5)',
        // innerOLD2: 'inset 5px 5px 5px rgba(198,204,225,.5),inset -5px -5px 5px rgba(255,255,255,.8)',
        inner: 'inset 5px 5px 8px rgba(198,204,225,.4),inset -5px -5px 9px rgba(255,255,255,.75)',
        innerFocus:
          'inset 4px 5px 8px rgba(198,204,225,.4),inset -5px -5px 5px rgba(255,255,255,.7)',
        // inner:
        //   'inset 5px 5px 9px 1px rgba(198,204,225,.4),inset -5px -5px 9px 1px rgba(255,255,255,.8)',
        // innner: 'inset 5px 6px 4px 0px rgba(198,204,225,1),inset -5px -6px 5px rgba(255,255,255,1)',
        // innner: 'inset 5px 6px 12px rgba(198,204,225,.5),inset -5px -6px 12px rgba(255,255,255,1)',
        innerr:
          'inset 0.15rem 0.15rem 0.35rem rgba(198,204,225,.5),inset -0.2rem -0.2rem 0.5rem rgba(255,255,255,.5)',
        threeD:
          'inset 2px 2px 2px 0px rgba(255,255,255,.8), inset -2px -2px 2px 0 rgba(198,204,225,.5)',
        threeDActive:
          '2px 2px 2px 0px rgba(255,255,255,.8), inset 1px 1px 2px 0px rgba(198,204,225,.5)',
        // outer:
        //   '-0.3rem -0.3rem 0.8rem rgba(255,255,255,.8), 0.15rem 0.15rem 0.35rem rgba(198,204,225,.5)'
        // outer: '0.2rem 0.2rem 0.5rem rgba(198,204,225,.5),-6px -6px 16px rgba(255,255,255,.5)'
        outer: '10px 10px 20px rgba(198,204,225,.4),-10px -10px 26px rgba(255,255,255,.9)',
        outerSmall: '5px 5px 15px rgba(198,204,225,.4),-5px -5px 18px rgba(255,255,255,.9)'
        // '0.6rem 0.6rem 1.2rem rgba(198,204,225,.2),-0.6rem -0.6rem 1.2rem rgba(255,255,255,1)'
        // HIBAouter: '10px 10px 24px rgba(198,204,225,.5),-10px -10px 24px rgba(255,255,255,.8)'
      },

      screens: {
        xs: '500px'
      }
    }
  },
  plugins: []
};

export default config;
