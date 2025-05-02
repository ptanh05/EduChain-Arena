"use client"

import { useState } from "react"
import Image from "next/image"
import { Award, Calendar, CheckCircle2, Download, ExternalLink, User } from "lucide-react"

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

interface NFTCertificateViewerProps {
  isOpen: boolean
  onClose: () => void
  certificate: {
    id: string
    name: string
    course: string
    issueDate: string
    image: string
    recipient: string
    txHash: string
  }
}

export function NFTCertificateViewer({ isOpen, onClose, certificate }: NFTCertificateViewerProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleVerify = () => {
    setIsVerifying(true)
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chứng Chỉ NFT</DialogTitle>
          <DialogDescription>Chứng chỉ xác thực trên blockchain Cardano</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
            <Image
              src={certificate.image || "/placeholder.svg?height=300&width=400"}
              alt={certificate.name}
              fill
              className="object-cover"
            />
            {isVerified && (
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{certificate.name}</h3>
              <p className="text-sm text-muted-foreground">{certificate.course}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Người nhận:</span>
                </div>
                <span className="text-sm font-medium">{certificate.recipient}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Ngày cấp:</span>
                </div>
                <span className="text-sm">{certificate.issueDate}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ID chứng chỉ:</span>
                </div>
                <span className="text-sm font-mono">{certificate.id}</span>
              </div>
            </div>

            <div className="rounded-md bg-muted p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Giao dịch blockchain:</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs font-mono break-all">{certificate.txHash}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Tải xuống</span>
          </Button>
          <Button onClick={handleVerify} disabled={isVerifying || isVerified} className="gap-2">
            {isVerifying ? (
              <span>Đang xác thực...</span>
            ) : isVerified ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Đã xác thực</span>
              </>
            ) : (
              <span>Xác thực trên blockchain</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
