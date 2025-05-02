"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, Check, Coins, Flame, LightbulbIcon, Timer, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PracticePage() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  const questions = [
    {
      question: "Cardano sử dụng thuật toán đồng thuận nào?",
      options: ["Proof of Work", "Proof of Stake", "Proof of Authority", "Delegated Proof of Stake"],
      correctAnswer: 1,
    },
    {
      question: "Smart Contract trên Cardano được viết bằng ngôn ngữ nào?",
      options: ["Solidity", "Plutus", "Aiken", "Tất cả đều đúng"],
      correctAnswer: 2,
    },
    {
      question: "Đơn vị tiền tệ chính của Cardano là gì?",
      options: ["ETH", "BTC", "ADA", "DOT"],
      correctAnswer: 2,
    },
  ]

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setTimeLeft(30)
  }

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index)
    if (index === questions[currentQuestion].correctAnswer) {
      setIsCorrect(true)
      setScore(score + 1)
    } else {
      setIsCorrect(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setTimeLeft(30)
    } else {
      setQuizStarted(false)
    }
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
              <span className="font-medium">250 EDU</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="w-full px-4 py-6 md:py-8 lg:py-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Khu Vực Luyện Tập</h1>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium">7 ngày streak</span>
            </div>
          </div>

          <Tabs defaultValue="daily" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="daily">Nhiệm Vụ Hàng Ngày</TabsTrigger>
              <TabsTrigger value="challenges">Thử Thách Kỹ Năng</TabsTrigger>
              <TabsTrigger value="streak">Chuỗi Streak</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Hàng Ngày</CardTitle>
                    <CardDescription>Trả lời câu hỏi để nhận token</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!quizStarted ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <Brain className="h-5 w-5 text-purple-500" />
                            <div>
                              <div className="font-medium">Quiz Blockchain</div>
                              <div className="text-xs text-muted-foreground">3 câu hỏi - 30 giây mỗi câu</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+10 EDU</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-4 bg-gray-50">
                          <p className="text-sm mb-2">Hoàn thành quiz hàng ngày để:</p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Nhận token thưởng</li>
                            <li>Duy trì chuỗi streak</li>
                            <li>Ôn tập kiến thức</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{timeLeft} giây</span>
                          </div>
                          <div className="text-sm">
                            Câu {currentQuestion + 1}/{questions.length}
                          </div>
                        </div>
                        <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
                        <div className="p-4 border rounded-md">
                          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
                          <div className="space-y-2">
                            {questions[currentQuestion].options.map((option, index) => (
                              <button
                                key={index}
                                className={`w-full text-left p-3 rounded-md border ${
                                  selectedAnswer === index
                                    ? index === questions[currentQuestion].correctAnswer
                                      ? "bg-green-50 border-green-500"
                                      : "bg-red-50 border-red-500"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={selectedAnswer !== null}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {selectedAnswer === index &&
                                    (index === questions[currentQuestion].correctAnswer ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <X className="h-4 w-4 text-red-500" />
                                    ))}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        {selectedAnswer !== null && (
                          <div className={`p-3 rounded-md ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                            <div className="flex items-center gap-2 mb-2">
                              {isCorrect ? (
                                <>
                                  <Check className="h-4 w-4 text-green-500" />
                                  <span className="font-medium text-green-700">Chính xác!</span>
                                </>
                              ) : (
                                <>
                                  <X className="h-4 w-4 text-red-500" />
                                  <span className="font-medium text-red-700">Chưa chính xác!</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm">
                              {isCorrect
                                ? "Rất tốt! Hãy tiếp tục câu tiếp theo."
                                : `Đáp án đúng là: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {!quizStarted ? (
                      <Button className="w-full" onClick={startQuiz}>
                        Bắt Đầu Quiz
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={nextQuestion} disabled={selectedAnswer === null}>
                        {currentQuestion < questions.length - 1 ? "Câu Tiếp Theo" : "Hoàn Thành"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Giải Code</CardTitle>
                      <CardDescription>Giải quyết bài tập lập trình</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                            <div>
                              <div className="font-medium">Bài 1: Tìm số Fibonacci</div>
                              <div className="text-xs text-muted-foreground">Độ khó: Dễ</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+5 EDU</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                            <div>
                              <div className="font-medium">Bài 2: Sắp xếp mảng</div>
                              <div className="text-xs text-muted-foreground">Độ khó: Trung bình</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+5 EDU</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                            <div>
                              <div className="font-medium">Bài 3: Thuật toán tìm kiếm</div>
                              <div className="text-xs text-muted-foreground">Độ khó: Khó</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+5 EDU</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Bắt Đầu Giải Code
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lab Mô Phỏng</CardTitle>
                      <CardDescription>Thực hành trong môi trường mô phỏng</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                          <div>
                            <div className="font-medium">Lab: Tạo Smart Contract đầu tiên</div>
                            <div className="text-xs text-muted-foreground">Thời gian: 30 phút</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">+15 EDU</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Bắt Đầu Lab
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="challenges">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Blockchain Basics</CardTitle>
                      <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardDescription>Level 3/5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={60} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Hoàn thành các thử thách về kiến thức blockchain cơ bản
                      </p>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Tiếp Tục Thử Thách</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Smart Contract</CardTitle>
                      <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardDescription>Level 1/5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={20} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Hoàn thành các thử thách về lập trình smart contract
                      </p>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Tiếp Tục Thử Thách</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Thuật Toán</CardTitle>
                      <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardDescription>Level 2/5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={40} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Hoàn thành các thử thách về thuật toán và cấu trúc dữ liệu
                      </p>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                        <div className="h-2 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Tiếp Tục Thử Thách</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="streak">
              <Card>
                <CardHeader>
                  <CardTitle>Chuỗi Streak</CardTitle>
                  <CardDescription>Duy trì streak để nhận bonus token</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-orange-500">7</div>
                        <div className="text-sm text-muted-foreground">Ngày liên tiếp</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">T2</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">T3</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">T4</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">T5</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">T6</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">T7</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-1">
                          <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <span className="text-xs">CN</span>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 bg-orange-50">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Flame className="h-5 w-5 text-orange-500" />
                        Phần thưởng Streak
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">3 ngày liên tiếp</span>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+10 EDU</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">7 ngày liên tiếp</span>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+25 EDU</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">14 ngày liên tiếp</span>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+50 EDU</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">30 ngày liên tiếp</span>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">+100 EDU</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
