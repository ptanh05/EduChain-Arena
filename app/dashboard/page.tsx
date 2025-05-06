"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CircleEllipsis,
  Clock,
  Coins,
  Crown,
  ExternalLink,
  GraduationCap,
  LayoutGrid,
  LineChart,
  Megaphone,
  PlusCircle,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
  Users,
  X,
  Bell,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [dailyQuests, setDailyQuests] = useState([
    { id: "1", title: "Hoàn thành 1 bài học", reward: 10, completed: true },
    { id: "2", title: "Giải 3 bài code", reward: 15, completed: false },
    { id: "3", title: "Thắng 1 trận PvP", reward: 20, completed: false },
  ]);

  const toggleQuestStatus = (id: string) => {
    setDailyQuests((quests) =>
      quests.map((quest) =>
        quest.id === id ? { ...quest, completed: !quest.completed } : quest
      )
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-bold">EduChain Arena</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link
                href="/dashboard/learn"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Học
              </Link>
              <Link
                href="/dashboard/practice"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Luyện Tập
              </Link>
              <Link
                href="/dashboard/battle"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Đấu Trí
              </Link>
              <Link
                href="/dashboard/rewards"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Phần Thưởng
              </Link>
              <Link
                href="/dashboard/collection"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Bộ Sưu Tập
              </Link>
              <Link
                href="/dashboard/marketplace"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Marketplace
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">250 EDU</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="font-medium">Eternl</span>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="Avatar"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="w-full max-w-screen-2xl mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cột trái */}
            <div className="w-full lg:w-2/3 space-y-6">
              {/* Thông tin tài khoản */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Avatar"
                  />
                  <AvatarFallback className="text-xl">AD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                    <h1 className="text-2xl font-bold">Anh Dương</h1>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-700 hover:bg-amber-100 hover:text-amber-700"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Hạng B
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                      >
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Chiến binh
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>Đặt mục tiêu học tập</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Streak: 12 ngày</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                      <span>250 EXP</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="shrink-0">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>Xem tiến độ</span>
                </Button>
              </div>

              {/* Các tab Quản lý */}
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="progress">Tiến độ</TabsTrigger>
                  <TabsTrigger value="achievements">Thành tích</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid gap-6">
                    {/* Phần tổng quan các khóa học */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-purple-600" />
                              <span>Khóa học gần đây</span>
                            </div>
                          </CardTitle>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                            asChild
                          >
                            <Link href="/dashboard/learn">
                              <span>Xem tất cả</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-1">
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    Blockchain Cơ Bản
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Bài 4: Cardano Architecture
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" asChild>
                                <Link href="/dashboard/learn/blockchain-basic">
                                  Tiếp tục
                                </Link>
                              </Button>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>

                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-green-100 rounded-md flex items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    Smart Contract 101
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Bài 2: Ngôn ngữ Aiken
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" asChild>
                                <Link href="/dashboard/learn/smart-contract-101">
                                  Tiếp tục
                                </Link>
                              </Button>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>

                          <Separator />

                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">
                              Khóa học đối tác
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-1"
                              asChild
                            >
                              <Link href="/dashboard/marketplace">
                                <span>Xem marketplace</span>
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </Button>
                          </div>

                          <div className="flex flex-col md:flex-row gap-3">
                            <Card className="flex-1">
                              <CardHeader className="p-3">
                                <CardTitle className="text-sm">
                                  Zero Knowledge Proofs
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  Cardano Academy
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-3 pt-0">
                                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                  350 EDU
                                </Badge>
                              </CardContent>
                            </Card>
                            <Card className="flex-1">
                              <CardHeader className="p-3">
                                <CardTitle className="text-sm">
                                  DeFi Developer Course
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  Blockchain Vietnam
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-3 pt-0">
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                  400 EDU
                                </Badge>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Nhiệm vụ hàng ngày */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <div className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-red-600" />
                              <span>Nhiệm vụ hàng ngày</span>
                            </div>
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium">
                              {dailyQuests.filter((q) => q.completed).length}/
                              {dailyQuests.length} hoàn thành
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-4">
                          {dailyQuests.map((quest) => (
                            <div
                              key={quest.id}
                              className="flex items-center justify-between p-3 rounded-md border"
                              onClick={() => toggleQuestStatus(quest.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`h-6 w-6 rounded-full flex items-center justify-center border-2 
                                  ${
                                    quest.completed
                                      ? "bg-green-500 border-green-500 text-white"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {quest.completed && (
                                    <Check className="h-4 w-4" />
                                  )}
                                </div>
                                <span
                                  className={
                                    quest.completed
                                      ? "line-through text-muted-foreground"
                                      : "font-medium"
                                  }
                                >
                                  {quest.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Coins className="h-4 w-4 text-yellow-500" />
                                <span>+{quest.reward} EDU</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CircleEllipsis className="h-4 w-4" />
                            <span>Làm mới sau: 12:32:45</span>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1">
                            <span>Xem thêm nhiệm vụ</span>
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="progress">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tiến Độ Học Tập</CardTitle>
                      <CardDescription>
                        Chi tiết tiến độ các khóa học của bạn
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Blockchain Cơ Bản
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 1: Giới thiệu về Blockchain
                              </span>
                              <span className="text-xs text-green-500">
                                Hoàn thành
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 2: Cơ chế đồng thuận
                              </span>
                              <span className="text-xs text-green-500">
                                Hoàn thành
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 3: Cryptography cơ bản
                              </span>
                              <span className="text-xs text-green-500">
                                Hoàn thành
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 4: Cardano Architecture
                              </span>
                              <span className="text-xs text-blue-500">
                                Đang học
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 5: Ứng dụng thực tế
                              </span>
                              <span className="text-xs text-gray-500">
                                Chưa bắt đầu
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Smart Contract 101
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 1: Giới thiệu Smart Contract
                              </span>
                              <span className="text-xs text-green-500">
                                Hoàn thành
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 2: Ngôn ngữ Aiken
                              </span>
                              <span className="text-xs text-blue-500">
                                Đang học
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 3: Viết Smart Contract đầu tiên
                              </span>
                              <span className="text-xs text-gray-500">
                                Chưa bắt đầu
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 4: Testing & Deployment
                              </span>
                              <span className="text-xs text-gray-500">
                                Chưa bắt đầu
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Bài 5: Dự án cuối khóa
                              </span>
                              <span className="text-xs text-gray-500">
                                Chưa bắt đầu
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thành tích đạt được</CardTitle>
                      <CardDescription>Huy hiệu và giải thưởng</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <h3 className="font-medium">Huy hiệu</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                              <Users className="h-8 w-8 text-green-500" />
                            </div>
                            <span className="text-sm font-medium">
                              Người mới
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Đã đạt được
                            </span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                              <Coins className="h-8 w-8 text-blue-500" />
                            </div>
                            <span className="text-sm font-medium">
                              Collector
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Đã đạt được
                            </span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                              <Swords className="h-8 w-8 text-gray-400" />
                            </div>
                            <span className="text-sm font-medium">
                              Chiến binh
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Chưa đạt được
                            </span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                              <Crown className="h-8 w-8 text-gray-400" />
                            </div>
                            <span className="text-sm font-medium">
                              Top Player
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Chưa đạt được
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Cột phải */}
            <div className="w-full lg:w-1/3 space-y-6">
              {/* Sự kiện sắp tới */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span>Sự Kiện Sắp Tới</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="font-mono text-center">
                          <div className="text-sm text-muted-foreground">
                            Tháng 5
                          </div>
                          <div className="text-xl font-bold">15-18</div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Hackathon Web3</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Tham gia hackathon để xây dựng ứng dụng Web3 trên
                            Cardano và nhận giải thưởng lớn.
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Hackathon</Badge>
                            <span className="text-xs text-muted-foreground">
                              10,000 ADA
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="font-mono text-center">
                          <div className="text-sm text-muted-foreground">
                            Tháng 6
                          </div>
                          <div className="text-xl font-bold">01-30</div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">
                            Giải Đấu PvP Mùa 1
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Tham gia giải đấu PvP mùa 1 với nhiều phần thưởng
                            hấp dẫn và NFT độc quyền.
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Giải đấu</Badge>
                            <span className="text-xs text-muted-foreground">
                              Rank C trở lên
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="font-mono text-center">
                          <div className="text-sm text-muted-foreground">
                            Tháng 5
                          </div>
                          <div className="text-xl font-bold">10</div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">
                            Workshop Smart Contract
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Workshop trực tuyến về lập trình smart contract trên
                            Cardano với các chuyên gia.
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Workshop</Badge>
                            <span className="text-xs text-muted-foreground">
                              50 EDU Token
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Xem tất cả sự kiện</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Bảng xếp hạng */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span>Bảng Xếp Hạng</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-md bg-amber-50">
                      <div className="flex items-center gap-3">
                        <div className="font-bold">5</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="Avatar"
                          />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Anh Dương</div>
                          <div className="text-xs text-muted-foreground">
                            250 EXP
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Hạng B
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="font-bold">1</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Avatar"
                            />
                            <AvatarFallback>TH</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">Tuấn Hưng</div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <LineChart className="h-4 w-4" />
                          <span>720 EXP</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="font-bold">2</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Avatar"
                            />
                            <AvatarFallback>ML</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">Minh Lê</div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <LineChart className="h-4 w-4" />
                          <span>685 EXP</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="font-bold">3</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Avatar"
                            />
                            <AvatarFallback>HN</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">Hà Nguyễn</div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <LineChart className="h-4 w-4" />
                          <span>592 EXP</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="font-bold">4</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Avatar"
                            />
                            <AvatarFallback>DT</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">Dũng Trần</div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <LineChart className="h-4 w-4" />
                          <span>328 EXP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#">
                      <LayoutGrid className="h-4 w-4 mr-2" />
                      <span>Xem bảng xếp hạng đầy đủ</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Thông báo */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-red-500" />
                      <span>Thông Báo</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">
                            Khóa học mới ra mắt
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Khóa học "Zero Knowledge Proofs" từ Cardano Academy
                            đã được thêm vào Marketplace.
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              1 giờ trước
                            </span>
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto"
                              asChild
                            >
                              <Link href="/dashboard/marketplace">
                                Xem ngay
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <X className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">
                            Chuỗi streak sắp bị đứt
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Bạn chưa hoàn thành nhiệm vụ hàng ngày hôm nay.
                            Chuỗi streak 12 ngày sắp bị đứt!
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              2 giờ trước
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Coins className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">
                            Đã nhận thưởng thành tích
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Bạn đã nhận được 25 EDU token cho việc duy trì
                            streak 7 ngày liên tiếp.
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              Hôm qua, 00:00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#">
                      <Bell className="h-4 w-4 mr-2" />
                      <span>Xem tất cả thông báo</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
