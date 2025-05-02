"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft, Coins, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useState } from "react"

interface SharedLayoutProps {
  children: ReactNode
  title?: string
  backLink?: string
  backText?: string
  showWalletButton?: boolean
}

export function SharedLayout({
  children,
  title,
  backLink = "/dashboard",
  backText = "Quay lại Dashboard",
  showWalletButton = true,
}: SharedLayoutProps) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)

  const handleWalletConnect = (walletType: string) => {
    setConnectedWallet(walletType)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 max-w-screen-2xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Link href={backLink} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">{backText}</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {showWalletButton && (
              <>
                {connectedWallet ? (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="font-medium">{connectedWallet} đã kết nối</span>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsWalletModalOpen(true)}>
                    <Wallet className="h-4 w-4 mr-2" />
                    Kết nối ví
                  </Button>
                )}
              </>
            )}
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">250 EDU</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="w-full max-w-screen-2xl mx-auto px-4 py-6 md:py-8 lg:py-12">
          {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
          {children}
        </div>
      </main>
    </div>
  )
}
