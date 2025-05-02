"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  Code,
  Coins,
  FileCode,
  Info,
  Loader2,
  RefreshCw,
  Wallet,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectModal } from "@/components/wallet-connect-modal"

export default function SmartContractsPage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenAmount, setTokenAmount] = useState("100")

  const handleWalletConnect = (walletType: string) => {
    setConnectedWallet(walletType)
  }

  const executeContract = () => {
    setIsExecuting(true)
    // Simulate contract execution
    setTimeout(() => {
      setIsExecuting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
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
              <span className="font-medium">250 EDU</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="w-full px-4 py-6 md:py-8 lg:py-12">
          <h1 className="text-3xl font-bold mb-6">Smart Contracts</h1>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Trạng thái ví</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">
                    {connectedWallet ? `${connectedWallet} đã kết nối` : "Chưa kết nối"}
                  </div>
                  <div className={`h-3 w-3 rounded-full ${connectedWallet ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
                {connectedWallet && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between mb-1">
                      <span>Địa chỉ:</span>
                      <span className="truncate max-w-[150px]">addr1q...7yv9g3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Số dư ADA:</span>
                      <span>120 ADA</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={connectedWallet ? "outline" : "default"}
                  onClick={() => setIsWalletModalOpen(true)}
                >
                  {connectedWallet ? "Đổi ví" : "Kết nối ví"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">EDU Token</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">250 EDU</div>
                  <Coins className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between mb-1">
                    <span>Tỉ giá hiện tại:</span>
                    <span>1 ADA = 100 EDU</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Có thể quy đổi:</span>
                    <span>2.5 ADA</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Smart Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">EduToken Exchange</div>
                  <FileCode className="h-6 w-6 text-purple-500" />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between mb-1">
                    <span>Địa chỉ hợp đồng:</span>
                    <span className="truncate max-w-[150px]">addr1w...f5xmq</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí giao dịch:</span>
                    <span>0.17 ADA</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="exchange" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="exchange">Quy Đổi Token</TabsTrigger>
              <TabsTrigger value="contracts">Danh Sách Hợp Đồng</TabsTrigger>
              <TabsTrigger value="transactions">Lịch Sử Giao Dịch</TabsTrigger>
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
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-5 w-5 text-amber-500" />
                          <h3 className="font-medium">Thông tin hợp đồng</h3>
                        </div>
                        <p className="text-sm text-amber-700">
                          Smart contract này cho phép quy đổi EDU Token sang ADA với tỉ lệ 100 EDU = 1 ADA. Phí giao
                          dịch là 0.17 ADA.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="token-amount">Số lượng EDU Token</Label>
                          <Input
                            id="token-amount"
                            type="number"
                            value={tokenAmount}
                            onChange={(e) => setTokenAmount(e.target.value)}
                            min="100"
                            max="250"
                            step="10"
                          />
                          <p className="text-xs text-muted-foreground">Tối thiểu: 100 EDU, Tối đa: 250 EDU</p>
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
                              <span>0.17 ADA</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between font-medium">
                              <span>Nhận được:</span>
                              <span>{(Number.parseInt(tokenAmount) / 100).toFixed(2)} ADA</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={executeContract}
                      disabled={!connectedWallet || isExecuting || Number.parseInt(tokenAmount) < 100}
                    >
                      {isExecuting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Đang thực hiện...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          Thành công!
                        </>
                      ) : (
                        "Thực hiện giao dịch"
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mã Smart Contract</CardTitle>
                    <CardDescription>Mã nguồn của hợp đồng quy đổi token</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-gray-900 text-gray-50 p-4 font-mono text-sm overflow-auto max-h-[400px]">
                      <pre className="whitespace-pre-wrap">
                        {`// EduToken Exchange Contract
// Written in Aiken for Cardano

validator {
  fn token_exchange(
    redeemer: Redeemer,
    context: ScriptContext,
  ) -> Bool {
    // Get transaction info
    let ScriptContext { transaction, purpose } = context
    let Transaction { inputs, outputs, .. } = transaction
    
    // Verify token exchange rate
    let edu_token_amount = redeemer.amount
    let ada_amount = edu_token_amount / 100
    
    // Verify minimum exchange amount
    if edu_token_amount < 100 {
      return false
    }
    
    // Verify user has enough tokens
    let user_tokens = get_user_tokens(inputs, redeemer.user_address)
    if user_tokens < edu_token_amount {
      return false
    }
    
    // Verify output contains correct ADA amount
    let correct_output = verify_output(
      outputs, 
      redeemer.user_address, 
      ada_amount
    )
    
    // Return validation result
    correct_output
  }
}

// Helper functions
fn get_user_tokens(inputs, address) -> Int {
  // Implementation omitted for brevity
  // Returns the amount of EDU tokens owned by the user
}

fn verify_output(outputs, address, amount) -> Bool {
  // Implementation omitted for brevity
  // Verifies that the output contains the correct ADA amount
}`}
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Code className="h-4 w-4 mr-2" />
                      Xem đầy đủ
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Kiểm tra trên chain
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contracts">
              <Card>
                <CardHeader>
                  <CardTitle>Danh Sách Smart Contracts</CardTitle>
                  <CardDescription>Các hợp đồng thông minh trong hệ sinh thái EduChain Arena</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">EduToken Exchange</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Sử dụng
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Quy đổi EDU Token sang ADA với tỉ lệ 100:1</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Địa chỉ:</span>
                        <span className="truncate">addr1wxyz...f5xmq</span>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">NFT Certificate Minting</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Sử dụng
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Tạo chứng chỉ NFT khi hoàn thành khóa học</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Địa chỉ:</span>
                        <span className="truncate">addr1wabc...d3kmq</span>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">PvP Battle Escrow</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Sử dụng
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Quản lý token đặt cược trong các trận đấu PvP
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Địa chỉ:</span>
                        <span className="truncate">addr1wdef...g7hmq</span>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">Governance DAO</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Sử dụng
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Quản lý đề xuất và bỏ phiếu trong hệ thống DAO
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Địa chỉ:</span>
                        <span className="truncate">addr1wghi...j9kmq</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch Sử Giao Dịch</CardTitle>
                  <CardDescription>Các giao dịch blockchain gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Quy đổi Token</span>
                        </div>
                        <span className="text-sm text-green-600">+2.00 ADA</span>
                      </div>
                      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                        <span>200 EDU → 2 ADA</span>
                        <span>3 ngày trước</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Hash:</span>
                        <span className="truncate">tx1abc...def</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Nhận NFT Chứng Chỉ</span>
                        </div>
                        <span className="text-sm">NFT #1234</span>
                      </div>
                      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                        <span>Blockchain Cơ Bản</span>
                        <span>1 tuần trước</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Hash:</span>
                        <span className="truncate">tx2ghi...jkl</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-red-500" />
                          <span className="font-medium">Đặt Cược PvP</span>
                        </div>
                        <span className="text-sm text-red-600">-20 EDU</span>
                      </div>
                      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                        <span>Trận đấu 1v1</span>
                        <span>2 tuần trước</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Hash:</span>
                        <span className="truncate">tx3mno...pqr</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Thắng PvP</span>
                        </div>
                        <span className="text-sm text-green-600">+40 EDU</span>
                      </div>
                      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                        <span>Trận đấu 1v1</span>
                        <span>2 tuần trước</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Hash:</span>
                        <span className="truncate">tx4stu...vwx</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
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
