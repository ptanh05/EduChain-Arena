import Link from "next/link"
import { ArrowRight, Award, BookOpen, Brain, Coins, Swords, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                EduChain Arena
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Học - Luyện - Đấu Trí - Thưởng & Phạt Token
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-200">
                <Link href="/dashboard">
                  Bắt Đầu Ngay <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="#features">Tìm Hiểu Thêm</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Các Chế Độ Chính</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Khám phá hệ sinh thái giáo dục phi tập trung của chúng tôi
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {/* Learning Area */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="p-3 rounded-full bg-purple-100">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold">Khu Vực Học</h3>
              <p className="text-gray-500 text-center">
                Các khóa học blockchain, lập trình, bảo mật từ cơ bản đến chuyên sâu với chứng chỉ NFT.
              </p>
            </div>
            {/* Practice Area */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="p-3 rounded-full bg-blue-100">
                <Brain className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Khu Vực Luyện Tập</h3>
              <p className="text-gray-500 text-center">
                Nhiệm vụ hàng ngày, thử thách kỹ năng và chuỗi streak để tích lũy token.
              </p>
            </div>
            {/* Battle Area */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="p-3 rounded-full bg-red-100">
                <Swords className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold">Khu Vực Đấu Trí</h3>
              <p className="text-gray-500 text-center">Đấu 1v1, 3v3, 5v5 theo chủ đề với cơ chế đặt cược token.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cơ Chế Thưởng & Phạt</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hệ thống minh bạch trên blockchain Cardano
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
            {/* Rewards */}
            <div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <Award className="h-10 w-10 text-green-600" />
                <h3 className="text-xl font-bold">Phần Thưởng</h3>
              </div>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Hoàn thành khóa học: Token + NFT chứng chỉ</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Thắng trận PvP: Token cược đối thủ</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Duy trì chuỗi Daily: Bonus token</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Top bảng xếp hạng: Trophy NFT + Thẻ buff</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Sự kiện theo mùa: NFT giới hạn</span>
                </li>
              </ul>
            </div>
            {/* Penalties */}
            <div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <Coins className="h-10 w-10 text-red-600" />
                <h3 className="text-xl font-bold">Hình Phạt</h3>
              </div>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Thua PvP: Mất toàn bộ token cược</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Bỏ cuộc PvP: Mất gấp đôi token + khóa PvP 24h</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Không hoàn thành nhiệm vụ daily: Reset streak, mất bonus</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Gian lận: Khoá tài khoản, thu hồi NFT + token</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Phá trận PvP: Khoá thi đấu từ 1–3 ngày</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Công Nghệ Sử Dụng</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Xây dựng trên nền tảng blockchain Cardano
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
              <p className="text-lg font-medium">Cardano</p>
              <p className="text-sm text-gray-500">Blockchain</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
              <p className="text-lg font-medium">Aiken</p>
              <p className="text-sm text-gray-500">Smart Contract</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
              <p className="text-lg font-medium">ReactJS / NextJS</p>
              <p className="text-sm text-gray-500">Frontend</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
              <p className="text-lg font-medium">Node.js</p>
              <p className="text-sm text-gray-500">Backend</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
              <p className="text-lg font-medium">IPFS</p>
              <p className="text-sm text-gray-500">Lưu trữ dữ liệu</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-900 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sẵn Sàng Tham Gia?</h2>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                "EduChain Arena – Nơi kiến thức là vũ khí, token là phần thưởng, và mỗi học viên là chiến binh trên hành
                trình Web3."
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-200">
                <Link href="/dashboard">
                  Bắt Đầu Ngay <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-bold">EduChain Arena</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 EduChain Arena. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
