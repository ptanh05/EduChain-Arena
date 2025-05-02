"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Coins,
  Info,
  Loader2,
  Shield,
  Swords,
  Trophy,
  User,
  Users,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

// Định nghĩa các kiểu dữ liệu
type BattleMode = "1v1" | "3v3" | "5v5"
type TopicType = "blockchain" | "algorithm" | "debug" | "code"
type BetAmount = 20 | 50 | 100 | 200

interface Topic {
  id: TopicType
  name: string
  description: string
  difficulty: "Dễ" | "Trung bình" | "Khó"
  icon: React.ReactNode
}

interface BattleSettings {
  mode: BattleMode
  topic: TopicType
  betAmount: BetAmount
  riskMode: boolean
}

export default function BattlePage() {
  // State cho các thiết lập trận đấu
  const [battleMode, setBattleMode] = useState<BattleMode>("1v1")
  const [selectedTopic, setSelectedTopic] = useState<TopicType>("algorithm")
  const [betAmount, setBetAmount] = useState<BetAmount>(20)
  const [riskMode, setRiskMode] = useState(false)

  // State cho quá trình tìm trận
  const [matchmaking, setMatchmaking] = useState(false)
  const [matchProgress, setMatchProgress] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(30)
  const [matchFound, setMatchFound] = useState(false)
  const [opponent, setOpponent] = useState<string | null>(null)

  // State cho thông tin người chơi
  const [playerStats, setPlayerStats] = useState({
    rank: "B",
    wins: 7,
    losses: 3,
    tokensWon: 180,
    tokensLost: 90,
    balance: 250,
  })

  // Danh sách các chủ đề
  const topics: Topic[] = [
    {
      id: "blockchain",
      name: "Blockchain Quiz",
      description: "Kiểm tra kiến thức về blockchain, smart contract và DeFi",
      difficulty: "Dễ",
      icon: <Info className="h-4 w-4" />,
    },
    {
      id: "algorithm",
      name: "Thuật Toán",
      description: "Giải quyết các bài toán thuật toán và cấu trúc dữ liệu",
      difficulty: "Trung bình",
      icon: <Info className="h-4 w-4" />,
    },
    {
      id: "debug",
      name: "Debug Nhanh",
      description: "Tìm và sửa lỗi trong đoạn code cho trước",
      difficulty: "Trung bình",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      id: "code",
      name: "Code Battle",
      description: "Viết code giải quyết vấn đề trong thời gian giới hạn",
      difficulty: "Khó",
      icon: <AlertCircle className="h-4 w-4" />,
    },
  ]

  // Danh sách các mức cược
  const betOptions: BetAmount[] = [20, 50, 100, 200]

  // Danh sách đối thủ giả lập
  const opponents = [
    "BlockMaster",
    "CodeNinja",
    "CryptoKing",
    "AlgoQueen",
    "DevWarrior",
    "TokenHunter",
    "SmartCoder",
    "Web3Guru",
  ]

  // Lưu thiết lập người dùng vào localStorage
  useEffect(() => {
    const saveSettings = () => {
      const settings: BattleSettings = {
        mode: battleMode,
        topic: selectedTopic,
        betAmount: betAmount,
        riskMode: riskMode,
      }
      localStorage.setItem("battleSettings", JSON.stringify(settings))
    }

    saveSettings()
  }, [battleMode, selectedTopic, betAmount, riskMode])

  // Khôi phục thiết lập từ localStorage
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem("battleSettings")
      if (savedSettings) {
        try {
          const settings: BattleSettings = JSON.parse(savedSettings)
          setBattleMode(settings.mode)
          setSelectedTopic(settings.topic)
          setBetAmount(settings.betAmount)
          setRiskMode(settings.riskMode)
        } catch (error) {
          console.error("Lỗi khi tải thiết lập:", error)
        }
      }
    }

    loadSettings()
  }, [])

  // Kiểm tra số dư trước khi đặt cược
  const checkBalance = (): boolean => {
    const requiredAmount = riskMode ? betAmount * 2 : betAmount
    return playerStats.balance >= requiredAmount
  }

  // Bắt đầu tìm trận
  const startMatchmaking = () => {
    if (!checkBalance()) {
      toast({
        title: "Số dư không đủ",
        description: `Bạn cần ít nhất ${riskMode ? betAmount * 2 : betAmount} EDU để tham gia trận đấu này.`,
        variant: "destructive",
      })
      return
    }

    setMatchmaking(true)
    setMatchProgress(0)
    setMatchFound(false)
    setOpponent(null)

    // Tính thời gian ước tính dựa trên chế độ và mức cược
    let time = 30
    if (battleMode === "3v3") time = 45
    if (battleMode === "5v5") time = 60
    if (betAmount >= 100) time += 15
    setEstimatedTime(time)

    // Mô phỏng quá trình tìm trận
    const interval = setInterval(() => {
      setMatchProgress((prev) => {
        const newProgress = prev + Math.random() * 5 + 1

        // Khi tiến trình đạt 70%, có cơ hội tìm thấy trận đấu
        if (newProgress >= 70 && !matchFound && Math.random() > 0.7) {
          setMatchFound(true)
          // Chọn ngẫu nhiên một đối thủ
          setOpponent(opponents[Math.floor(Math.random() * opponents.length)])

          toast({
            title: "Đã tìm thấy đối thủ!",
            description: "Chuẩn bị vào trận đấu...",
          })

          // Sau 3 giây, chuyển hướng đến trang trận đấu (giả lập)
          setTimeout(() => {
            toast({
              title: "Bắt đầu trận đấu",
              description: "Chúc may mắn!",
            })
            // Ở đây chúng ta chỉ reset state, trong thực tế sẽ chuyển hướng
            cancelMatchmaking()
          }, 3000)
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 500)

    // Lưu interval ID để có thể clear khi cần
    return () => clearInterval(interval)
  }

  // Hủy tìm trận
  const cancelMatchmaking = () => {
    setMatchmaking(false)
    setMatchProgress(0)
    setMatchFound(false)
    setOpponent(null)
  }

  // Tính toán số token có thể thắng
  const calculatePotentialWin = (): number => {
    let multiplier = 1

    // Risk mode có hệ số nhân 2
    if (riskMode) multiplier = 2

    // Chế độ khó có thưởng cao hơn
    const topic = topics.find((t) => t.id === selectedTopic)
    if (topic?.difficulty === "Khó") multiplier += 0.2
    if (topic?.difficulty === "Trung bình") multiplier += 0.1

    return Math.round(betAmount * multiplier)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Quay lại Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{playerStats.balance} EDU</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="w-full px-4 py-6 md:py-8 lg:py-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Khu Vực Đấu Trí</h1>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Rank {playerStats.rank}</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Thành Tích</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {playerStats.wins}W / {playerStats.losses}L
                  </div>
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <div className="mt-2">
                  <Progress
                    value={(playerStats.wins / (playerStats.wins + playerStats.losses)) * 100}
                    className="h-2"
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {Math.round((playerStats.wins / (playerStats.wins + playerStats.losses)) * 100)}% tỉ lệ thắng
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Token Đã Thắng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">+{playerStats.tokensWon} EDU</div>
                  <Coins className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Trung bình: +{(playerStats.tokensWon / playerStats.wins).toFixed(1)} EDU/trận thắng
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Token Đã Mất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">-{playerStats.tokensLost} EDU</div>
                  <Coins className="h-6 w-6 text-red-500" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Trung bình: -{(playerStats.tokensLost / playerStats.losses).toFixed(1)} EDU/trận thua
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="battle" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="battle">Tham Gia Đấu Trí</TabsTrigger>
              <TabsTrigger value="history">Lịch Sử Đấu</TabsTrigger>
            </TabsList>
            <TabsContent value="battle">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Chọn Chế Độ Đấu</CardTitle>
                    <CardDescription>Tham gia đấu trí để kiếm token</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Số người tham gia</label>
                        <div className="grid grid-cols-3 gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={battleMode === "1v1" ? "default" : "outline"}
                                  onClick={() => setBattleMode("1v1")}
                                  className={`transition-all ${battleMode === "1v1" ? "border-2 border-primary shadow-md" : ""}`}
                                >
                                  <User className="h-4 w-4 mr-2" />
                                  1v1
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Đấu 1 đối 1 - Phù hợp cho người mới</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={battleMode === "3v3" ? "default" : "outline"}
                                  onClick={() => setBattleMode("3v3")}
                                  className={`transition-all ${battleMode === "3v3" ? "border-2 border-primary shadow-md" : ""}`}
                                >
                                  <Users className="h-4 w-4 mr-2" />
                                  3v3
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Đấu đội 3 người - Thưởng token cao hơn 20%</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={battleMode === "5v5" ? "default" : "outline"}
                                  onClick={() => setBattleMode("5v5")}
                                  className={`transition-all ${battleMode === "5v5" ? "border-2 border-primary shadow-md" : ""}`}
                                >
                                  <Users className="h-4 w-4 mr-2" />
                                  5v5
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Đấu đội 5 người - Thưởng token cao hơn 50%</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chủ đề</label>
                        <div className="grid grid-cols-2 gap-2">
                          {topics.map((topic) => (
                            <TooltipProvider key={topic.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant={selectedTopic === topic.id ? "default" : "outline"}
                                    onClick={() => setSelectedTopic(topic.id)}
                                    className={`transition-all ${selectedTopic === topic.id ? "border-2 border-primary shadow-md" : ""}`}
                                  >
                                    {topic.name}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    <p>{topic.description}</p>
                                    <p className="text-xs">Độ khó: {topic.difficulty}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mức cược</label>
                        <div className="grid grid-cols-4 gap-2">
                          {betOptions.map((amount) => (
                            <Button
                              key={amount}
                              variant={betAmount === amount ? "default" : "outline"}
                              onClick={() => setBetAmount(amount)}
                              className={`transition-all ${betAmount === amount ? "border-2 border-primary shadow-md" : ""}`}
                            >
                              <Coins className="h-4 w-4 mr-2" />
                              {amount} EDU
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="risk-mode"
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            checked={riskMode}
                            onChange={() => setRiskMode(!riskMode)}
                          />
                          <label htmlFor="risk-mode" className="text-sm font-medium text-red-600">
                            Risk Zone (Đặt cược gấp đôi, thắng lớn - thua trắng)
                          </label>
                        </div>

                        {riskMode && (
                          <div className="text-xs text-red-500 pl-6">
                            Cược: {betAmount * 2} EDU | Thắng: +{calculatePotentialWin()} EDU | Thua: -{betAmount * 2}{" "}
                            EDU
                          </div>
                        )}
                      </div>

                      <div className="p-3 rounded-md bg-amber-50">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-amber-500" />
                          <p className="text-sm font-medium text-amber-700">Thông tin trận đấu</p>
                        </div>
                        <div className="mt-2 text-sm text-amber-600">
                          <p>Thắng: +{calculatePotentialWin()} EDU</p>
                          <p>Thua: -{riskMode ? betAmount * 2 : betAmount} EDU</p>
                          <p>
                            Thời gian tìm trận ước tính:{" "}
                            {battleMode === "1v1" ? "30-60 giây" : battleMode === "3v3" ? "1-2 phút" : "2-3 phút"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {!matchmaking ? (
                      <Button
                        className="w-full"
                        variant={riskMode ? "destructive" : "default"}
                        onClick={startMatchmaking}
                      >
                        <Swords className="h-4 w-4 mr-2" />
                        Bắt Đầu Tìm Trận
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" onClick={cancelMatchmaking}>
                        Hủy Tìm Trận
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trạng Thái</CardTitle>
                    <CardDescription>
                      {matchmaking
                        ? matchFound
                          ? "Đã tìm thấy đối thủ!"
                          : "Đang tìm đối thủ..."
                        : "Chọn chế độ đấu và bắt đầu tìm trận"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {matchmaking ? (
                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center p-8">
                          {matchFound ? (
                            <>
                              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                              </div>
                              <p className="text-lg font-medium mb-2">Đã tìm thấy đối thủ!</p>
                              <p className="text-sm font-medium text-primary mb-1">Đối thủ: {opponent}</p>
                              <p className="text-sm text-muted-foreground mb-4">Đang chuẩn bị vào trận...</p>
                            </>
                          ) : (
                            <>
                              <Swords className="h-16 w-16 text-primary mb-4 animate-pulse" />
                              <p className="text-lg font-medium mb-2">Đang tìm đối thủ...</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Thời gian tìm trận ước tính: {estimatedTime} giây
                              </p>
                            </>
                          )}
                          <div className="w-full">
                            <Progress value={matchProgress} className={`h-2 ${matchFound ? "bg-green-100" : ""}`} />
                          </div>
                        </div>
                        <div className="border rounded-md p-4 bg-gray-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Thông tin trận đấu</p>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p>
                              Chế độ:{" "}
                              <span className="font-medium">
                                {battleMode} {topics.find((t) => t.id === selectedTopic)?.name}
                              </span>
                            </p>
                            <p>
                              Mức cược: <span className="font-medium">{riskMode ? betAmount * 2 : betAmount} EDU</span>
                            </p>
                            {riskMode && (
                              <p className="text-red-600">
                                Risk Zone: <span className="font-medium">Có (x2)</span>
                              </p>
                            )}
                            <p>
                              Thắng: <span className="font-medium text-green-600">+{calculatePotentialWin()} EDU</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8">
                        <Swords className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">Sẵn sàng tham gia?</p>
                        <p className="text-sm text-muted-foreground text-center">
                          Chọn chế độ đấu và bắt đầu tìm trận để thách thức kỹ năng của bạn
                        </p>

                        <div className="mt-6 w-full">
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn rank đối thủ (tùy chọn)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Rank đối thủ</SelectLabel>
                                <SelectItem value="any">Bất kỳ</SelectItem>
                                <SelectItem value="c">Rank C trở lên</SelectItem>
                                <SelectItem value="b">Rank B trở lên</SelectItem>
                                <SelectItem value="a">Rank A trở lên</SelectItem>
                                <SelectItem value="s">Rank S</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          <p className="text-xs text-muted-foreground mt-2">
                            Chọn rank đối thủ sẽ tăng thời gian tìm trận nhưng giúp bạn tìm được đối thủ phù hợp hơn
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch Sử Đấu Trí</CardTitle>
                  <CardDescription>10 trận gần nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">Thắng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600 font-medium">+25 EDU</span>
                          <Coins className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>1v1 Thuật Toán vs. User123</p>
                        <p className="text-xs text-muted-foreground">Hôm nay, 10:30</p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">Thắng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600 font-medium">+20 EDU</span>
                          <Coins className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>1v1 Blockchain Quiz vs. BlockMaster</p>
                        <p className="text-xs text-muted-foreground">Hôm qua, 15:45</p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="font-medium">Thua</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-red-600 font-medium">-30 EDU</span>
                          <Coins className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>1v1 Debug Nhanh vs. CodeNinja</p>
                        <p className="text-xs text-muted-foreground">Hôm qua, 18:20</p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">Thắng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600 font-medium">+25 EDU</span>
                          <Coins className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>3v3 Thuật Toán vs. Team Alpha</p>
                        <p className="text-xs text-muted-foreground">2 ngày trước, 14:10</p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">Thắng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600 font-medium">+30 EDU</span>
                          <Coins className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>1v1 Code Battle vs. DevWarrior</p>
                        <p className="text-xs text-muted-foreground">3 ngày trước, 09:15</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Loader2 className="h-4 w-4 mr-2" />
                    Tải thêm
                  </Button>
                  <Button variant="outline">Xem thống kê chi tiết</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
