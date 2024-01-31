import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const minecraft = localFont({
    src: [
        {
            path: '../assets/fonts/MinecraftRegular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/MinecraftItalic.otf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../assets/fonts/MinecraftBold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/MinecraftBoldItalic.otf',
            weight: '700',
            style: 'italic',
        },
    ],
  })