"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, BadgeCheck, Coins, ExternalLink, Gift, History, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenExchangeModal } from "@/components/token-exchange-modal"
import { WalletConnectModal } from "@/components/wallet-connect-modal"

export default function RewardsPage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const eduBalance = 250

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

      <TokenExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        walletConnected={!!connectedWallet}
        eduBalance={eduBalance}
      />

      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Quay lại Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{eduBalance} EDU</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="w-full px-4 py-6 md:py-8 lg:py-12">
          <h1 className="text-3xl font-bold mb-6">Phần Thưởng</h1>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">EDU Token</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{eduBalance} EDU</div>
                  <Coins className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between mb-1">
                    <span>Đã kiếm được tổng cộng:</span>
                    <span>340 EDU</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Đã sử dụng:</span>
                    <span>90 EDU</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Chứng Chỉ NFT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">0 NFT</div>
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Blockchain Cơ Bản</span>
                    <span className="text-xs text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">Hoàn thành khóa học để nhận NFT đầu tiên</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Huy Hiệu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">2 Huy Hiệu</div>
                  <BadgeCheck className="h-6 w-6 text-blue-500" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                      <BadgeCheck className="h-6 w-6 text-green-500" />
                    </div>
                    <span className="text-xs">Newbie</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                      <Coins className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-xs">Collector</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="exchange" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="exchange">Quy Đổi Token</TabsTrigger>
              <TabsTrigger value="history">Lịch Sử Nhận Thưởng</TabsTrigger>
              <TabsTrigger value="cards">Thẻ Ưu Đãi</TabsTrigger>
            </TabsList>
            <TabsContent value="exchange">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quy Đổi EDU Token</CardTitle>
                    <CardDescription>Đổi EDU Token sang ADA qua smart contract</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-md bg-amber-50">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-amber-500" />
                          Điều kiện quy đổi
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Hoàn thành ít nhất 1 khóa học đầy đủ</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Xác minh danh tính (KYC nhẹ)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Đạt Rank tối thiểu (Rank B trở lên)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Tỉ giá hiện tại</span>
                          <span>1 ADA = 100 EDU</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Số dư khả dụng</span>
                          <span>{eduBalance} EDU</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Giới hạn quy đổi</span>
                          <span>500 EDU / tuần</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium">Ước tính quy đổi</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>100 EDU</span>
                          <span>≈ 0.83 ADA (sau phí)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={!connectedWallet} onClick={() => setIsExchangeModalOpen(true)}>
                      {connectedWallet ? "Quy Đổi Token" : "Kết nối ví để tiếp tục"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kết Nối Ví Cardano</CardTitle>
                    <CardDescription>Kết nối ví Cardano để nhận token</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connectedWallet ? (
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center p-4">
                          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <Wallet className="h-8 w-8 text-green-500" />
                          </div>
                          <p className="text-lg font-medium">{connectedWallet} đã kết nối</p>
                        </div>

                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Địa chỉ ví</p>
                          </div>
                          <p className="text-xs text-muted-foreground break-all">
                            addr1qxy8m9h0mkzahqxedu7ay9mzsmgpzm0er0hm3qxwxmxprxv4fz0jm2ynky6vf5xmqwl2zqcu5x7cmdup5qc4j8706fqq7yv9g3
                          </p>
                        </div>

                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Số dư</p>
                            <p className="text-sm">120 ADA</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 space-y-4">
                        <Wallet className="h-16 w-16 text-gray-300 mb-2" />
                        <p className="text-lg font-medium">Chưa kết nối ví</p>
                        <p className="text-sm text-muted-foreground text-center">
                          Kết nối ví Cardano để quy đổi EDU Token sang ADA và nhận NFT chứng chỉ
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setIsWalletModalOpen(true)}>
                      {connectedWallet ? "Đổi ví" : "Kết nối ví"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch Sử Nhận Thưởng</CardTitle>
                  <CardDescription>Các phần thưởng đã nhận gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Hoàn thành Quiz Hàng Ngày</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span>+10 EDU</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Hôm nay, 10:30</p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Thắng trận PvP 1v1</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span>+25 EDU</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Hôm nay, 09:15</p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Hoàn thành bài học Blockchain</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span>+15 EDU</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Hôm qua, 16:45</p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Duy trì streak 7 ngày</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span>+25 EDU</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Hôm qua, 00:00</p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Nhận huy hiệu Collector</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                          <span>Huy hiệu</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">2 ngày trước, 14:20</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Xem giao dịch trên blockchain
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="cards">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <div className="h-2 bg-yellow-500"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Thẻ X2 Token</CardTitle>
                      <Gift className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardDescription>Nhân đôi token từ học/luyện</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Sử dụng thẻ này để nhân đôi số token nhận được từ các hoạt động học tập và luyện tập trong 24
                        giờ.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Số lượng:</span>
                        <span>0</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline" disabled>
                      Sử Dụng Thẻ
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="h-2 bg-blue-500"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Thẻ Tăng Tốc</CardTitle>
                      <Gift className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardDescription>Giảm thời gian ghép trận PvP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Sử dụng thẻ này để giảm 50% thời gian tìm trận đấu PvP trong 3 lần ghép trận tiếp theo.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Số lượng:</span>
                        <span>1</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Sử Dụng Thẻ
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="h-2 bg-green-500"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Thẻ Gợi Ý</CardTitle>
                      <Gift className="h-5 w-5 text-green-500" />
                    </div>
                    <CardDescription>Mở hint trong quiz hoặc lab</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Sử dụng thẻ này để nhận gợi ý khi làm quiz hoặc thực hành trong lab mô phỏng.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Số lượng:</span>
                        <span>2</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Sử Dụng Thẻ
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
