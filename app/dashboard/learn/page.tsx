import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Coins,
  Lock,
  PlayCircle,
  Flame,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SharedLayout } from "@/components/shared-layout";

export default function LearnPage() {
  return (
    <SharedLayout title="Khu Vực Học">
      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="courses">Khóa Học Miễn Phí</TabsTrigger>
          <TabsTrigger value="marketplace">Khóa Học Đối Tác</TabsTrigger>
          <TabsTrigger value="certificates">Chứng Chỉ NFT</TabsTrigger>
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
                <CardDescription>
                  Hiểu về công nghệ blockchain và ứng dụng
                </CardDescription>
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
                  <Link href="/dashboard/learn/blockchain-basic">
                    Tiếp Tục Học
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course 2 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">
                      Smart Contract 101
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500 text-xs font-medium">
                    <PlayCircle className="h-3 w-3" />
                    <span>Đã bắt đầu</span>
                  </div>
                </div>
                <CardDescription>
                  Lập trình hợp đồng thông minh trên Cardano
                </CardDescription>
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
                  <Link href="/dashboard/learn/smart-contract-101">
                    Tiếp Tục Học
                  </Link>
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
                <CardDescription>
                  Bảo mật và phòng chống lỗ hổng trong Web3
                </CardDescription>
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
                <CardDescription>
                  Tài chính phi tập trung và các ứng dụng
                </CardDescription>
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

        <TabsContent value="marketplace">
          {/* Banner cho marketplace */}
          <div className="mb-6 p-6 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Khóa học từ các đối tác</h2>
                <p className="text-gray-200 max-w-xl">
                  Khám phá các khóa học chuyên sâu từ các đối tác hàng đầu về
                  blockchain, phát triển DApp, và Web3. Nhận chứng chỉ NFT có
                  giá trị sau khi hoàn thành.
                </p>
              </div>
              <Button
                asChild
                className="shrink-0 bg-white text-blue-900 hover:bg-gray-100"
              >
                <Link href="/dashboard/marketplace">Xem tất cả khóa học</Link>
              </Button>
            </div>
          </div>

          {/* Khóa học đối tác nổi bật */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Khóa học nổi bật</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/marketplace">Xem tất cả</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Featured Course 1 */}
              <Card className="overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2 bg-yellow-500 hover:bg-yellow-600">
                        Nổi bật
                      </Badge>
                      <CardTitle className="text-lg">
                        Zero Knowledge Proofs Advanced
                      </CardTitle>
                      <CardDescription>Cardano Academy</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      <Flame className="h-3 w-3" />
                      <span>Bán chạy</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Khóa học chuyên sâu về Zero Knowledge Proofs, Circom và ứng
                    dụng trong Blockchain
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      ZK Proofs
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Privacy
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Cryptography
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>10 tuần</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">350 EDU</span>
                      <span className="text-xs line-through text-muted-foreground">
                        500 EDU
                      </span>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-3">
                  <Button asChild className="w-full">
                    <Link href="/dashboard/marketplace">Xem chi tiết</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Featured Course 2 */}
              <Card className="overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2 bg-blue-500 hover:bg-blue-600">
                        Mới
                      </Badge>
                      <CardTitle className="text-lg">
                        DeFi Complete Developer Course
                      </CardTitle>
                      <CardDescription>
                        Blockchain Vietnam Foundation
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      <Flame className="h-3 w-3" />
                      <span>Xu hướng</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Khóa học toàn diện về phát triển ứng dụng DeFi trên Cardano
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      DeFi
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Aiken
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Smart Contract
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>12 tuần</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">400 EDU</span>
                      <span className="text-xs line-through text-muted-foreground">
                        600 EDU
                      </span>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-3">
                  <Button asChild className="w-full">
                    <Link href="/dashboard/marketplace">Xem chi tiết</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild variant="outline">
              <Link href="/dashboard/marketplace">
                Xem tất cả khóa học đối tác
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Chứng Chỉ NFT</CardTitle>
                <CardDescription>
                  Chứng chỉ xác thực kỹ năng trên blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Hoàn thành khóa học để nhận chứng chỉ NFT xác thực kỹ năng
                    của bạn trên blockchain Cardano. Chứng chỉ NFT có thể được
                    cá nhân hóa và chia sẻ với nhà tuyển dụng.
                  </p>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <p className="text-sm font-medium mb-2">
                      Chưa có chứng chỉ
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hoàn thành khóa học Blockchain Cơ Bản để nhận chứng chỉ
                      NFT đầu tiên.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/collection">
                    Xem bộ sưu tập chứng chỉ
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Đối tác đào tạo</CardTitle>
                <CardDescription>
                  Các đối tác cung cấp khóa học và chứng chỉ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi hợp tác với các tổ chức hàng đầu trong lĩnh vực
                    blockchain để cung cấp nội dung chất lượng cao và chứng chỉ
                    có giá trị trong ngành.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 border rounded-md">
                      <div className="h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
                      <span className="text-xs font-medium text-center">
                        Cardano Academy
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 border rounded-md">
                      <div className="h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
                      <span className="text-xs font-medium text-center">
                        Blockchain VN
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 border rounded-md">
                      <div className="h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
                      <span className="text-xs font-medium text-center">
                        CyberSec Academy
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/marketplace">Xem tất cả đối tác</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </SharedLayout>
  );
}
