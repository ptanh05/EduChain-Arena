"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, BookOpen, Brain, ChevronRight, Coins, Flame, Swords, Trophy, Wallet, Archive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { WalletConnectModal } from "@/components/wallet-connect-modal"

export default function Dashboard() {
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
        <div className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-bold">EduChain Arena</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/dashboard/learn" className="text-sm font-medium text-muted-foreground">
              Học
            </Link>
            <Link href="/dashboard/practice" className="text-sm font-medium text-muted-foreground">
              Luyện Tập
            </Link>
            <Link href="/dashboard/battle" className="text-sm font-medium text-muted-foreground">
              Đấu Trí
            </Link>
            <Link href="/dashboard/rewards" className="text-sm font-medium text-muted-foreground">
              Phần Thưởng
            </Link>
            <Link href="/dashboard/collection" className="text-sm font-medium text-muted-foreground">
              Bộ Sưu Tập
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">250 EDU</span>
            </div>
            {connectedWallet ? (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">{connectedWallet}</span>
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setIsWalletModalOpen(true)} className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <span className="hidden sm:inline-block">Kết nối ví</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-screen-2xl mx-auto w-full px-4 py-6 md:py-8 lg:py-12">
          {/* User Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cấp Độ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Cấp 5</div>
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <div className="mt-2">
                  <Progress value={65} className="h-2" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">65/100 XP để lên cấp</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">7 Ngày</div>
                  <Flame className="h-6 w-6 text-orange-500" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">T2</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">T3</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">T4</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">T5</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">T6</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">T7</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="mt-1 text-xs">CN</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rank PvP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Rank B</div>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="mt-2">
                  <Progress value={70} className="h-2" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">70/100 điểm để lên Rank A</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Areas */}
          <h2 className="text-2xl font-bold mb-6">Khu Vực Chính</h2>
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            {/* Learning Area */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-blue-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <CardTitle>Khu Vực Học</CardTitle>
                </div>
                <CardDescription>Khóa học blockchain, lập trình, bảo mật</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Blockchain Cơ Bản</span>
                      <span className="text-xs text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Smart Contract 101</span>
                      <span className="text-xs text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/learn">
                    Tiếp Tục Học <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Practice Area */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-green-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-500" />
                  <CardTitle>Khu Vực Luyện Tập</CardTitle>
                </div>
                <CardDescription>Nhiệm vụ hàng ngày, thử thách kỹ năng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Quiz Hàng Ngày</span>
                    </div>
                    <span className="text-xs text-green-500">Hoàn thành</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                      <span className="text-sm font-medium">Giải Code</span>
                    </div>
                    <span className="text-xs text-muted-foreground">0/3</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/practice">
                    Luyện Tập Ngay <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Battle Area */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-red-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Swords className="h-5 w-5 text-red-500" />
                  <CardTitle>Khu Vực Đấu Trí</CardTitle>
                </div>
                <CardDescription>Đấu 1v1, 3v3, 5v5 theo chủ đề</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Thành tích</span>
                    <span className="text-sm">7 thắng / 3 thua</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                      <span className="text-xs text-muted-foreground">1v1</span>
                      <span className="font-medium">5W/2L</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                      <span className="text-xs text-muted-foreground">3v3</span>
                      <span className="font-medium">2W/1L</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                      <span className="text-xs text-muted-foreground">5v5</span>
                      <span className="font-medium">0W/0L</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="destructive">
                  <Link href="/dashboard/battle">
                    Tham Gia Đấu Trí <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Collection Area */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-purple-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-purple-500" />
                  <CardTitle>Bộ Sưu Tập</CardTitle>
                </div>
                <CardDescription>NFT, chứng chỉ và vật phẩm đặc biệt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tổng vật phẩm</span>
                    <span className="text-sm">6 vật phẩm</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                      <span className="text-xs text-muted-foreground">Chứng chỉ</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                      <span className="text-xs text-muted-foreground">Huy hiệu</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/dashboard/collection">
                    Xem Bộ Sưu Tập <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Daily Challenges */}
          <h2 className="text-2xl font-bold mb-6">Nhiệm Vụ Hàng Ngày</h2>
          <div className="grid gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Nhiệm Vụ Hôm Nay</CardTitle>
                <CardDescription>Hoàn thành để nhận token và duy trì streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Hoàn thành 1 bài học</div>
                        <div className="text-xs text-muted-foreground">+10 EDU Token</div>
                      </div>
                    </div>
                    <span className="text-xs text-green-500">Hoàn thành</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                      <div>
                        <div className="font-medium">Giải 3 bài code</div>
                        <div className="text-xs text-muted-foreground">+15 EDU Token</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">0/3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                      <div>
                        <div className="font-medium">Thắng 1 trận PvP</div>
                        <div className="text-xs text-muted-foreground">+20 EDU Token</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">0/1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Section */}
          {!connectedWallet && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Kết Nối Ví Cardano</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Kết nối ví để mở khóa tính năng blockchain</CardTitle>
                  <CardDescription>
                    Kết nối ví Cardano để nhận token, NFT chứng chỉ và tham gia các hoạt động trên blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-8 space-y-4">
                    <Wallet className="h-16 w-16 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">Chưa kết nối ví</p>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      Kết nối ví Cardano để quy đổi EDU Token sang ADA, nhận NFT chứng chỉ và tham gia các hoạt động
                      blockchain khác trong hệ sinh thái EduChain Arena.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => setIsWalletModalOpen(true)} className="px-8">
                    <Wallet className="h-4 w-4 mr-2" />
                    Kết Nối Ví Ngay
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Upcoming Events */}
          <h2 className="text-2xl font-bold mb-6">Sự Kiện Sắp Tới</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Web3</CardTitle>
                <CardDescription>15/05/2025 - 18/05/2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tham gia hackathon để xây dựng ứng dụng Web3 trên Cardano và nhận giải thưởng lớn.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span>Giải thưởng:</span>
                  <span className="font-medium">10,000 ADA</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Đăng Ký Tham Gia
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giải Đấu PvP Mùa 1</CardTitle>
                <CardDescription>01/06/2025 - 30/06/2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tham gia giải đấu PvP mùa 1 với nhiều phần thưởng hấp dẫn và NFT độc quyền.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span>Yêu cầu:</span>
                  <span className="font-medium">Rank C trở lên</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Xem Chi Tiết
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workshop Smart Contract</CardTitle>
                <CardDescription>10/05/2025, 19:00 - 21:00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Workshop trực tuyến về lập trình smart contract trên Cardano với các chuyên gia.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span>Phí tham gia:</span>
                  <span className="font-medium">50 EDU Token</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Đăng Ký
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
