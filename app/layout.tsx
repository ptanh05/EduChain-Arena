import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduChain Arena",
  description: "Học - Luyện - Đấu Trí - Thưởng & Phạt Token",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen mx-auto max-w-screen-2xl">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
