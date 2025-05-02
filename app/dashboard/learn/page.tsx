import Link from "next/link"
import { BookOpen, CheckCircle, Clock, Coins, Lock, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SharedLayout } from "@/components/shared-layout"

export default function LearnPage() {
  return (
    <SharedLayout title="Khu Vực Học">
      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="courses">Khóa Học</TabsTrigger>
          <TabsTrigger value="certificates">Chứng Chỉ NFT</TabsTrigger>
          <TabsTrigger value="progress">Tiến Độ</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Course 1 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Blockchain Cơ Bản</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                    <CheckCircle className="h-3 w-3" />
                    <span>Đang học</span>
                  </div>
                </div>
                <CardDescription>Hiểu về công nghệ blockchain và ứng dụng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tiến độ</span>
                      <span className="text-xs text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>8 giờ học</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>100 EDU</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/learn/blockchain-basic">Tiếp Tục Học</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 2 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Smart Contract 101</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500 text-xs font-medium">
                    <PlayCircle className="h-3 w-3" />
                    <span>Đã bắt đầu</span>
                  </div>
                </div>
                <CardDescription>Lập trình hợp đồng thông minh trên Cardano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tiến độ</span>
                      <span className="text-xs text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>12 giờ học</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>150 EDU</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/learn/smart-contract-101">Tiếp Tục Học</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 3 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Bảo Mật Web3</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                    <Lock className="h-3 w-3" />
                    <span>Chưa mở khóa</span>
                  </div>
                </div>
                <CardDescription>Bảo mật và phòng chống lỗ hổng trong Web3</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tiến độ</span>
                      <span className="text-xs text-muted-foreground">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>15 giờ học</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>200 EDU</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link href="#">Mở Khóa (500 EDU)</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 4 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">DeFi Fundamentals</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                    <Lock className="h-3 w-3" />
                    <span>Chưa mở khóa</span>
                  </div>
                </div>
                <CardDescription>Tài chính phi tập trung và các ứng dụng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tiến độ</span>
                      <span className="text-xs text-muted-foreground">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>10 giờ học</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>180 EDU</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link href="#">Mở Khóa (450 EDU)</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="certificates">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Chứng Chỉ NFT</CardTitle>
                <CardDescription>Chứng chỉ xác thực kỹ năng trên blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Hoàn thành khóa học để nhận chứng chỉ NFT xác thực kỹ năng của bạn trên blockchain Cardano. Chứng
                    chỉ NFT có thể được cá nhân hóa và chia sẻ với nhà tuyển dụng.
                  </p>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <p className="text-sm font-medium mb-2">Chưa có chứng chỉ</p>
                    <p className="text-xs text-muted-foreground">
                      Hoàn thành khóa học Blockchain Cơ Bản để nhận chứng chỉ NFT đầu tiên.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Tiến Độ Học Tập</CardTitle>
              <CardDescription>Theo dõi quá trình học tập của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Blockchain Cơ Bản</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 1: Giới thiệu về Blockchain</span>
                      <span className="text-xs text-green-500">Hoàn thành</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 2: Cơ chế đồng thuận</span>
                      <span className="text-xs text-green-500">Hoàn thành</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 3: Cryptography cơ bản</span>
                      <span className="text-xs text-green-500">Hoàn thành</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 4: Cardano Architecture</span>
                      <span className="text-xs text-blue-500">Đang học</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 5: Ứng dụng thực tế</span>
                      <span className="text-xs text-gray-500">Chưa bắt đầu</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Smart Contract 101</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 1: Giới thiệu Smart Contract</span>
                      <span className="text-xs text-green-500">Hoàn thành</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 2: Ngôn ngữ Aiken</span>
                      <span className="text-xs text-blue-500">Đang học</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 3: Viết Smart Contract đầu tiên</span>
                      <span className="text-xs text-gray-500">Chưa bắt đầu</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 4: Testing & Deployment</span>
                      <span className="text-xs text-gray-500">Chưa bắt đầu</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bài 5: Dự án cuối khóa</span>
                      <span className="text-xs text-gray-500">Chưa bắt đầu</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedLayout>
  )
}
