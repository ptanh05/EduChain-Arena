"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Copy, Facebook, Linkedin, Mail, Share2, TextIcon as Telegram, Twitter } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface ShareNFTModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    description: string
    image: string
    type: string
    dateAcquired: string
    txHash?: string
  }
}

export function ShareNFTModal({ isOpen, onClose, item }: ShareNFTModalProps) {
  const [copied, setCopied] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [showQRCode, setShowQRCode] = useState(false)

  // Tạo URL chia sẻ (trong thực tế, đây sẽ là URL thực đến trang xem NFT công khai)
  const shareUrl = `https://educhain-arena.example/view/${item.type}/${item.id}`

  // Tạo tiêu đề và mô tả chia sẻ
  const shareTitle = `Xem ${item.name} của tôi trên EduChain Arena!`
  const shareDescription = item.description || "Tham gia EduChain Arena để nhận chứng chỉ NFT và phần thưởng!"

  // Xử lý sao chép liên kết
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast({
      title: "Đã sao chép liên kết!",
      description: "Liên kết đã được sao chép vào clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Xử lý chia sẻ lên mạng xã hội
  const handleShareSocial = (platform: string) => {
    let shareLink = ""
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    const encodedDesc = encodeURIComponent(customMessage || shareDescription)

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "telegram":
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "email":
        shareLink = `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`
        break
      default:
        shareLink = shareUrl
    }

    // Mở cửa sổ chia sẻ
    if (platform !== "email") {
      window.open(shareLink, "_blank", "width=600,height=400")
    } else {
      window.location.href = shareLink
    }

    toast({
      title: "Đang chia sẻ...",
      description: `Đang mở ${platform} để chia sẻ NFT của bạn.`,
    })
  }

  // Tạo QR code cho URL chia sẻ (giả lập)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Chia sẻ {item.name}
          </DialogTitle>
          <DialogDescription>Chia sẻ NFT của bạn lên mạng xã hội hoặc gửi trực tiếp cho bạn bè</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
            <TabsTrigger value="link">Liên kết</TabsTrigger>
            <TabsTrigger value="qrcode" onClick={() => setShowQRCode(true)}>
              QR Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-blue-50 hover:bg-blue-100"
                  onClick={() => handleShareSocial("facebook")}
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-sky-50 hover:bg-sky-100"
                  onClick={() => handleShareSocial("twitter")}
                >
                  <Twitter className="h-6 w-6 text-sky-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-blue-50 hover:bg-blue-100"
                  onClick={() => handleShareSocial("linkedin")}
                >
                  <Linkedin className="h-6 w-6 text-blue-700" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-sky-50 hover:bg-sky-100"
                  onClick={() => handleShareSocial("telegram")}
                >
                  <Telegram className="h-6 w-6 text-sky-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-red-50 hover:bg-red-100"
                  onClick={() => handleShareSocial("email")}
                >
                  <Mail className="h-6 w-6 text-red-600" />
                </Button>
              </div>

              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-message">Tin nhắn tùy chỉnh (tùy chọn)</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Thêm tin nhắn cá nhân khi chia sẻ..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="share-link">Liên kết chia sẻ</Label>
                <div className="flex space-x-2">
                  <Input id="share-link" value={shareUrl} readOnly className="flex-1" />
                  <Button variant="outline" size="icon" onClick={handleCopyLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sao chép liên kết này để chia sẻ NFT của bạn với bất kỳ ai
                </p>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h4 className="mb-2 text-sm font-medium">Xem trước chia sẻ</h4>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{shareTitle}</p>
                  <p className="text-xs text-muted-foreground">{shareDescription}</p>
                  <p className="text-xs text-blue-600">{shareUrl}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qrcode" className="space-y-4 py-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border p-4 bg-white">
                {showQRCode && <Image src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={200} height={200} />}
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Quét mã QR này để xem NFT trên thiết bị di động
              </p>

              <Button variant="outline" onClick={handleCopyLink} className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Sao chép liên kết
              </Button>

              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Tải QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="EduChain Arena"
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
            <div className="text-sm">
              <p className="font-medium">EduChain Arena</p>
              <p className="text-xs text-muted-foreground">Học - Luyện - Đấu Trí</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="https://educhain-arena.example" target="_blank" rel="noopener noreferrer">
              Tham gia
            </a>
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Download(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}
