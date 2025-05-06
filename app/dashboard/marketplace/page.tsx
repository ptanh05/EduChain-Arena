"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Coins,
  ExternalLink,
  Filter,
  Search,
  Star,
  Tags,
  Users,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SharedLayout } from "@/components/shared-layout";
import { Badge } from "@/components/ui/badge";
import { PurchaseCourseModal } from "@/components/purchase-course-modal";

// Fake data cho các khóa học từ đối tác
const partnerCourses = [
  {
    id: "1",
    title: "Zero Knowledge Proofs Advanced",
    description:
      "Khóa học chuyên sâu về Zero Knowledge Proofs, Circom và ứng dụng trong Blockchain",
    provider: "Cardano Academy",
    providerLogo: "/placeholder.svg?height=40&width=40",
    level: "Nâng cao",
    price: 350,
    originalPrice: 500,
    duration: "10 tuần",
    categories: ["ZK Proofs", "Privacy", "Cryptography"],
    rating: 4.8,
    ratingCount: 152,
    students: 948,
    featured: true,
    verified: true,
    image: "/placeholder.svg?height=200&width=300",
    partnerInfo: {
      name: "Cardano Academy",
      description:
        "Tổ chức đào tạo Blockchain hàng đầu Việt Nam với hơn 5 năm kinh nghiệm",
      verified: true,
      courses: 15,
      students: 12000,
      rating: 4.9,
    },
  },
  {
    id: "2",
    title: "DeFi Complete Developer Course",
    description: "Khóa học toàn diện về phát triển ứng dụng DeFi trên Cardano",
    provider: "Blockchain Vietnam Foundation",
    providerLogo: "/placeholder.svg?height=40&width=40",
    level: "Trung cấp - Nâng cao",
    price: 400,
    originalPrice: 600,
    duration: "12 tuần",
    categories: ["DeFi", "Aiken", "Smart Contract"],
    rating: 4.6,
    ratingCount: 98,
    students: 521,
    featured: true,
    verified: true,
    image: "/placeholder.svg?height=200&width=300",
    partnerInfo: {
      name: "Blockchain Vietnam Foundation",
      description:
        "Tổ chức phi lợi nhuận thúc đẩy ứng dụng blockchain tại Việt Nam",
      verified: true,
      courses: 8,
      students: 5000,
      rating: 4.7,
    },
  },
  {
    id: "3",
    title: "Web3 Security & Audit",
    description: "Học cách kiểm tra và bảo mật ứng dụng Web3 và Smart Contract",
    provider: "CyberSec Academy",
    providerLogo: "/placeholder.svg?height=40&width=40",
    level: "Nâng cao",
    price: 300,
    originalPrice: 400,
    duration: "8 tuần",
    categories: ["Security", "Audit", "Bug Bounty"],
    rating: 4.9,
    ratingCount: 76,
    students: 312,
    featured: false,
    verified: true,
    image: "/placeholder.svg?height=200&width=300",
    partnerInfo: {
      name: "CyberSec Academy",
      description: "Đơn vị đào tạo hàng đầu về bảo mật và an ninh mạng",
      verified: true,
      courses: 12,
      students: 8500,
      rating: 4.8,
    },
  },
  {
    id: "4",
    title: "Blockchain for Business Leaders",
    description:
      "Khóa học về ứng dụng Blockchain trong kinh doanh dành cho lãnh đạo doanh nghiệp",
    provider: "FTU Business School",
    providerLogo: "/placeholder.svg?height=40&width=40",
    level: "Cơ bản - Trung cấp",
    price: 250,
    originalPrice: 350,
    duration: "6 tuần",
    categories: ["Business", "Strategy", "Enterprise"],
    rating: 4.7,
    ratingCount: 112,
    students: 650,
    featured: false,
    verified: true,
    image: "/placeholder.svg?height=200&width=300",
    partnerInfo: {
      name: "FTU Business School",
      description:
        "Trường kinh doanh hàng đầu với chương trình đào tạo về công nghệ tiên tiến",
      verified: true,
      courses: 6,
      students: 4500,
      rating: 4.6,
    },
  },
  {
    id: "5",
    title: "NFT Art & Design Masterclass",
    description: "Học cách thiết kế, tạo và bán NFT nghệ thuật trên blockchain",
    provider: "Digital Art Institute",
    providerLogo: "/placeholder.svg?height=40&width=40",
    level: "Cơ bản - Trung cấp",
    price: 200,
    originalPrice: 280,
    duration: "8 tuần",
    categories: ["NFT", "Digital Art", "Creative"],
    rating: 4.5,
    ratingCount: 187,
    students: 875,
    featured: false,
    verified: false,
    image: "/placeholder.svg?height=200&width=300",
    partnerInfo: {
      name: "Digital Art Institute",
      description:
        "Học viện nghệ thuật số với các chương trình đào tạo về NFT và blockchain art",
      verified: false,
      courses: 9,
      students: 3200,
      rating: 4.5,
    },
  },
  {
    id: "6",
    title: "Cardano Stake Pool Operation",
    description:
      "Hướng dẫn chi tiết về cách thiết lập và vận hành Stake Pool trên Cardano",
    provider: "Cardano Vietnam Hub",
    providerLogo: "/placeholder.svg?height=40&width=40",
    level: "Trung cấp - Nâng cao",
    price: 280,
    originalPrice: 380,
    duration: "4 tuần",
    categories: ["Staking", "Node", "Infrastructure"],
    rating: 4.9,
    ratingCount: 63,
    students: 215,
    featured: false,
    verified: true,
    image: "/placeholder.svg?height=200&width=300",
    partnerInfo: {
      name: "Cardano Vietnam Hub",
      description:
        "Cộng đồng Cardano Việt Nam cung cấp các khóa học chuyên sâu về hệ sinh thái Cardano",
      verified: true,
      courses: 5,
      students: 1800,
      rating: 4.8,
    },
  },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showProviderInfo, setShowProviderInfo] = useState<string | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Lọc khóa học dựa trên tìm kiếm và bộ lọc
  const filteredCourses = partnerCourses.filter((course) => {
    // Lọc theo tìm kiếm
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.provider.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Lọc theo danh mục
    if (selectedCategory && !course.categories.includes(selectedCategory)) {
      return false;
    }

    // Lọc theo cấp độ
    if (selectedLevel && !course.level.includes(selectedLevel)) {
      return false;
    }

    // Lọc theo nhà cung cấp
    if (selectedProvider && course.provider !== selectedProvider) {
      return false;
    }

    return true;
  });

  // Tất cả các danh mục từ khóa học
  const allCategories = Array.from(
    new Set(partnerCourses.flatMap((course) => course.categories))
  );

  // Tất cả các cấp độ từ khóa học
  const allLevels = Array.from(
    new Set(partnerCourses.map((course) => course.level))
  );

  // Tất cả các nhà cung cấp từ khóa học
  const allProviders = Array.from(
    new Set(partnerCourses.map((course) => course.provider))
  );

  const handlePurchaseCourse = (course: any) => {
    setSelectedCourse(course);
    setShowPurchaseModal(true);
  };

  return (
    <SharedLayout title="Marketplace Khóa Học">
      {/* Modal thông tin nhà cung cấp */}
      {showProviderInfo && (
        <Dialog
          open={!!showProviderInfo}
          onOpenChange={() => setShowProviderInfo(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Thông tin nhà cung cấp</DialogTitle>
              <DialogDescription>Chi tiết về đơn vị đào tạo</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {partnerCourses.find((c) => c.provider === showProviderInfo)
                ?.partnerInfo && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 relative rounded-full overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=56&width=56"
                        alt={showProviderInfo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg flex items-center gap-1">
                        {showProviderInfo}
                        {partnerCourses.find(
                          (c) => c.provider === showProviderInfo
                        )?.partnerInfo.verified && (
                          <Check className="h-4 w-4 text-blue-500" />
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>
                          {
                            partnerCourses.find(
                              (c) => c.provider === showProviderInfo
                            )?.partnerInfo.rating
                          }{" "}
                          (
                          {partnerCourses
                            .find((c) => c.provider === showProviderInfo)
                            ?.partnerInfo.students.toLocaleString()}{" "}
                          học viên)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm">
                    {
                      partnerCourses.find(
                        (c) => c.provider === showProviderInfo
                      )?.partnerInfo.description
                    }
                  </p>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">
                        {
                          partnerCourses.find(
                            (c) => c.provider === showProviderInfo
                          )?.partnerInfo.courses
                        }
                      </span>
                      <span className="text-muted-foreground">Khóa học</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">
                        {partnerCourses
                          .find((c) => c.provider === showProviderInfo)
                          ?.partnerInfo.students.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">Học viên</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg flex items-center">
                        {
                          partnerCourses.find(
                            (c) => c.provider === showProviderInfo
                          )?.partnerInfo.rating
                        }
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      </span>
                      <span className="text-muted-foreground">Đánh giá</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowProviderInfo(null)}
              >
                Đóng
              </Button>
              <Button className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Xem tất cả khóa học
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal mua khóa học */}
      {selectedCourse && (
        <PurchaseCourseModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          course={selectedCourse}
        />
      )}

      {/* Phần tìm kiếm và bộ lọc */}
      <div className="grid gap-4 md:gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm khóa học, nhà cung cấp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Tags className="h-4 w-4" />
                  Danh mục
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                  Tất cả danh mục
                </DropdownMenuItem>
                <Separator className="my-1" />
                {allCategories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Cấp độ
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedLevel(null)}>
                  Tất cả cấp độ
                </DropdownMenuItem>
                <Separator className="my-1" />
                {allLevels.map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Nhà cung cấp
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedProvider(null)}>
                  Tất cả nhà cung cấp
                </DropdownMenuItem>
                <Separator className="my-1" />
                {allProviders.map((provider) => (
                  <DropdownMenuItem
                    key={provider}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    {provider}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Hiển thị các bộ lọc đã chọn */}
        {(selectedCategory || selectedLevel || selectedProvider) && (
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                Danh mục: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 hover:text-foreground"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedLevel && (
              <Badge variant="secondary" className="gap-1">
                Cấp độ: {selectedLevel}
                <button
                  onClick={() => setSelectedLevel(null)}
                  className="ml-1 hover:text-foreground"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedProvider && (
              <Badge variant="secondary" className="gap-1">
                Nhà cung cấp: {selectedProvider}
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="ml-1 hover:text-foreground"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Hiển thị kết quả */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Khóa học đối tác ({filteredCourses.length})
        </h2>
      </div>

      {/* Danh sách khóa học */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
              {course.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Nổi bật
                </div>
              )}
            </div>
            <CardHeader className="p-4 pb-0">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg line-clamp-2">
                  {course.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => setShowProviderInfo(course.provider)}
                >
                  <div className="h-6 w-6 relative rounded-full overflow-hidden border">
                    <Image
                      src={course.providerLogo || "/placeholder.svg"}
                      alt={course.provider}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Button>
              </div>
              <CardDescription className="flex items-center gap-1 mt-1">
                <span className="line-clamp-1">{course.provider}</span>
                {course.verified && <Check className="h-3 w-3 text-blue-500" />}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm line-clamp-2 text-muted-foreground mb-3">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {course.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {course.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.categories.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({course.ratingCount})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{course.students.toLocaleString()} học viên</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-bold">{course.price} EDU</span>
                </div>
                {course.originalPrice > course.price && (
                  <span className="text-xs line-through text-muted-foreground">
                    {course.originalPrice} EDU
                  </span>
                )}
              </div>
              <Button onClick={() => handlePurchaseCourse(course)}>
                Mua khóa học
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="p-4 rounded-full bg-gray-100 mb-4">
            <BookOpen className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            Không tìm thấy khóa học nào
          </h3>
          <p className="text-center text-muted-foreground max-w-md">
            Không tìm thấy khóa học nào phù hợp với bộ lọc của bạn. Hãy thử điều
            chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.
          </p>
        </div>
      )}
    </SharedLayout>
  );
}
