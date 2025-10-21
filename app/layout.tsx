"use client"
import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ThemeProvider } from "@/lib/theme-provider"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background`}>
        <Provider store={store}>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
