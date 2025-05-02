"use client"

import { useState } from "react"
import { CheckCircle2, Coins, Info, Loader2, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface TokenExchangeModalProps {
  isOpen: boolean
  onClose: () => void
  walletConnected: boolean
  eduBalance: number
}

export function TokenExchangeModal({ isOpen, onClose, walletConnected, eduBalance }: TokenExchangeModalProps) {
  const [tokenAmount, setTokenAmount] = useState("100")
  const [isExecuting, setIsExecuting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExchange = () => {
    if (!walletConnected) {
      setError("Vui lòng kết nối ví trước khi thực hiện giao dịch")
      return
    }

    const amount = Number(tokenAmount)
    if (isNaN(amount) || amount < 100) {
      setError("Số lượng token tối thiểu là 100 EDU")
      return
    }

    if (amount > eduBalance) {
      setError("Số dư không đủ")
      return
    }

    setError(null)
    setIsExecuting(true)

    // Simulate contract execution
    setTimeout(() => {
      setIsExecuting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2000)
    }, 2000)
  }

  const resetState = () => {
    setTokenAmount("100")
    setIsExecuting(false)
    setIsSuccess(false)
    setError(null)
    onClose()
  }

  const adaAmount = Number(tokenAmount) / 100
  const fee = 0.17

  return (
    <Dialog open={isOpen} onOpenChange={resetState}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quy Đổi EDU Token</DialogTitle>
          <DialogDescription>Đổi EDU Token sang ADA qua smart contract</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!walletConnected ? (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
              <Wallet className="h-12 w-12 text-muted-foreground" />
              <p className="text-center font-medium">Vui lòng kết nối ví để tiếp tục</p>
              <p className="text-sm text-muted-foreground text-center">
                Bạn cần kết nối ví Cardano để thực hiện giao dịch quy đổi token
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 border rounded-md bg-amber-50">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Thông tin giao dịch</h3>
                </div>
                <p className="text-sm text-amber-700">
                  Smart contract này cho phép quy đổi EDU Token sang ADA với tỉ lệ 100 EDU = 1 ADA. Phí giao dịch là
                  0.17 ADA.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="token-amount">Số lượng EDU Token</Label>
                <Input
                  id="token-amount"
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  min="100"
                  max={eduBalance.toString()}
                  step="10"
                  disabled={isExecuting}
                />
                <p className="text-xs text-muted-foreground">
                  Tối thiểu: 100 EDU, Tối đa: {eduBalance} EDU (số dư hiện tại)
                </p>
              </div>

              <div className="p-4 border rounded-md bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Chi tiết giao dịch</span>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>EDU Token:</span>
                    <span>{tokenAmount} EDU</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tỉ giá:</span>
                    <span>100 EDU = 1 ADA</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí giao dịch:</span>
                    <span>{fee} ADA</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between font-medium">
                    <span>Nhận được:</span>
                    <span>{adaAmount.toFixed(2)} ADA</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Thực nhận:</span>
                    <span>{(adaAmount - fee).toFixed(2)} ADA</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                  <p>{error}</p>
                </div>
              )}

              {isSuccess && (
                <div className="p-3 rounded-md bg-green-50 text-green-600 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <p>Giao dịch thành công!</p>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={resetState} disabled={isExecuting}>
            Hủy
          </Button>
          <Button onClick={handleExchange} disabled={!walletConnected || isExecuting || isSuccess}>
            {isExecuting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang thực hiện...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Thành công!
              </>
            ) : (
              <>
                <Coins className="h-4 w-4 mr-2" />
                Thực hiện giao dịch
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
