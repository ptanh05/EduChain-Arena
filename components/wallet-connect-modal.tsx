"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle2, Copy, ExternalLink, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: string) => void
}

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [copied, setCopied] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const wallets = [
    {
      name: "Nami",
      icon: "/placeholder.svg?height=40&width=40",
      description: "Ví Cardano phổ biến nhất",
    },
    {
      name: "Eternl",
      icon: "/placeholder.svg?height=40&width=40",
      description: "Ví đa chức năng cho Cardano",
    },
    {
      name: "Flint",
      icon: "/placeholder.svg?height=40&width=40",
      description: "Ví đơn giản và dễ sử dụng",
    },
    {
      name: "Typhon",
      icon: "/placeholder.svg?height=40&width=40",
      description: "Ví web cho Cardano",
    },
  ]

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName)
    // Simulate wallet connection
    setTimeout(() => {
      setConnected(true)
      setWalletAddress(
        "addr1qxy8m9h0mkzahqxedu7ay9mzsmgpzm0er0hm3qxwxmxprxv4fz0jm2ynky6vf5xmqwl2zqcu5x7cmdup5qc4j8706fqq7yv9g3",
      )
      onConnect(walletName)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetState = () => {
    setSelectedWallet(null)
    setConnected(false)
    setWalletAddress("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetState}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{connected ? "Ví đã kết nối" : "Kết nối ví Cardano"}</DialogTitle>
          <DialogDescription>
            {connected
              ? "Ví của bạn đã được kết nối thành công với EduChain Arena"
              : "Chọn ví Cardano để kết nối với EduChain Arena"}
          </DialogDescription>
        </DialogHeader>
        {!connected ? (
          <div className="grid gap-4 py-4">
            {selectedWallet ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <p className="text-center">
                  Đang kết nối với <span className="font-medium">{selectedWallet}</span>...
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  Vui lòng mở ví {selectedWallet} của bạn và chấp nhận kết nối
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                    onClick={() => handleWalletSelect(wallet.name)}
                  >
                    <Image
                      src={wallet.icon || "/placeholder.svg"}
                      alt={wallet.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div className="text-left">
                      <p className="font-medium">{wallet.name}</p>
                      <p className="text-sm text-muted-foreground">{wallet.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <p className="font-medium">Kết nối thành công!</p>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Địa chỉ ví</p>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground break-all">{walletAddress}</p>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Số dư</p>
                <p className="text-sm">120 ADA</p>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Ví</p>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt={selectedWallet || ""}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <p className="text-sm">{selectedWallet}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-between">
          {!connected ? (
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={resetState}>
                Hủy
              </Button>
              {selectedWallet && (
                <Button variant="outline" onClick={() => setSelectedWallet(null)}>
                  Chọn ví khác
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={resetState} className="w-full">
              Đóng
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
