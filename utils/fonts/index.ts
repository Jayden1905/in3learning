import { Space_Mono, Source_Sans_3 } from 'next/font/google'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const sourceSans = Source_Sans_3({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
})

export const normalFont: string = sourceSans.className

export const headerFont: string = spaceMono.className
