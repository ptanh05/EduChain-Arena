"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Calendar,
  Coins,
  Download,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  Search,
  Share2,
  Shield,
  Trophy,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTCertificateViewer } from "@/components/nft-certificate-viewer";
import { ShareNFTModal } from "@/components/share-nft-modal";
import { toast } from "@/components/ui/use-toast";

// Định nghĩa các kiểu dữ liệu
type ItemType = "certificate" | "badge" | "trophy" | "special";
type ViewMode = "grid" | "list";

interface CollectionItem {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  image: string;
  dateAcquired: string;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
  txHash?: string;
  metadata?: Record<string, any>;
}

export default function CollectionPage() {
  // State cho chế độ xem và lọc
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("newest");

  // State cho dialog xem chi tiết
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCertificateViewerOpen, setIsCertificateViewerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Dữ liệu mẫu cho bộ sưu tập
  const collectionItems: CollectionItem[] = [
    {
      id: "cert-001",
      type: "certificate",
      name: "Chứng Chỉ Blockchain Cơ Bản",
      description: "Hoàn thành khóa học Blockchain Cơ Bản",
      image: "/placeholder.svg?height=400&width=300",
      dateAcquired: "15/04/2025",
      rarity: "uncommon",
      txHash: "tx1abc...def456",
      metadata: {
        issuer: "EduChain Arena",
        courseId: "BC-101",
        grade: "A",
        skills: [
          "Blockchain Fundamentals",
          "Cryptography",
          "Consensus Mechanisms",
        ],
      },
    },
    {
      id: "badge-001",
      type: "badge",
      name: "Huy Hiệu Newbie",
      description: "Hoàn thành 5 bài học đầu tiên",
      image: "/placeholder.svg?height=200&width=200",
      dateAcquired: "10/04/2025",
      rarity: "common",
    },
    {
      id: "badge-002",
      type: "badge",
      name: "Huy Hiệu Collector",
      description: "Tích lũy 100 EDU Token",
      image: "/placeholder.svg?height=200&width=200",
      dateAcquired: "12/04/2025",
      rarity: "common",
    },
    {
      id: "trophy-001",
      type: "trophy",
      name: "Cúp Giải Đấu Mùa 1",
      description: "Top 10 giải đấu PvP mùa 1",
      image: "/placeholder.svg?height=300&width=200",
      dateAcquired: "01/04/2025",
      rarity: "rare",
      txHash: "tx2ghi...jkl789",
    },
    {
      id: "special-001",
      type: "special",
      name: "Thẻ Buff X2 Token",
      description: "Nhân đôi token nhận được trong 24h",
      image: "/placeholder.svg?height=200&width=200",
      dateAcquired: "05/04/2025",
      rarity: "epic",
    },
    {
      id: "cert-002",
      type: "certificate",
      name: "Chứng Chỉ Smart Contract 101",
      description: "Hoàn thành khóa học Smart Contract 101",
      image: "/placeholder.svg?height=400&width=300",
      dateAcquired: "20/04/2025",
      rarity: "rare",
      txHash: "tx3mno...pqr012",
      metadata: {
        issuer: "EduChain Arena",
        courseId: "SC-101",
        grade: "B+",
        skills: [
          "Smart Contract Development",
          "Aiken Language",
          "Testing & Deployment",
        ],
      },
    },
  ];

  // Lọc các item dựa trên các tiêu chí
  const filteredItems = collectionItems.filter((item) => {
    // Lọc theo tìm kiếm
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Lọc theo loại
    if (selectedType !== "all" && item.type !== selectedType) {
      return false;
    }

    // Lọc theo độ hiếm
    if (selectedRarity !== "all" && item.rarity !== selectedRarity) {
      return false;
    }

    return true;
  });

  // Sắp xếp các item
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (selectedSort) {
      case "newest":
        return (
          new Date(b.dateAcquired).getTime() -
          new Date(a.dateAcquired).getTime()
        );
      case "oldest":
        return (
          new Date(a.dateAcquired).getTime() -
          new Date(b.dateAcquired).getTime()
        );
      case "rarity":
        const rarityOrder = {
          legendary: 5,
          epic: 4,
          rare: 3,
          uncommon: 2,
          common: 1,
        };
        return (
          (rarityOrder[b.rarity || "common"] || 0) -
          (rarityOrder[a.rarity || "common"] || 0)
        );
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Xử lý khi click vào item
  const handleItemClick = (item: CollectionItem) => {
    setSelectedItem(item);
    if (item.type === "certificate") {
      setIsCertificateViewerOpen(true);
    } else {
      setIsDetailOpen(true);
    }
  };

  // Xử lý khi click vào nút chia sẻ
  const handleShareClick = () => {
    if (selectedItem) {
      setIsShareModalOpen(true);
    }
  };

  // Xử lý khi click vào nút tải xuống
  const handleDownload = () => {
    if (selectedItem) {
      toast({
        title: "Đang tải xuống...",
        description: `Đang tải ${selectedItem.name}.`,
      });
    }
  };

  // Hiển thị icon dựa trên loại item
  const getItemIcon = (type: ItemType) => {
    switch (type) {
      case "certificate":
        return <Award className="h-5 w-5 text-purple-500" />;
      case "badge":
        return <BadgeCheck className="h-5 w-5 text-blue-500" />;
      case "trophy":
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case "special":
        return <Shield className="h-5 w-5 text-green-500" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  // Hiển thị màu dựa trên độ hiếm
  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-600";
      case "uncommon":
        return "bg-green-100 text-green-600";
      case "rare":
        return "bg-blue-100 text-blue-600";
      case "epic":
        return "bg-purple-100 text-purple-600";
      case "legendary":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Hiển thị tên độ hiếm
  const getRarityName = (rarity?: string) => {
    switch (rarity) {
      case "common":
        return "Phổ biến";
      case "uncommon":
        return "Không phổ biến";
      case "rare":
        return "Hiếm";
      case "epic":
        return "Sử thi";
      case "legendary":
        return "Huyền thoại";
      default:
        return "Phổ biến";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {selectedItem && selectedItem.type === "certificate" && (
        <NFTCertificateViewer
          isOpen={isCertificateViewerOpen}
          onClose={() => setIsCertificateViewerOpen(false)}
          certificate={{
            id: selectedItem.id,
            name: selectedItem.name,
            course: selectedItem.description,
            issueDate: selectedItem.dateAcquired,
            image: selectedItem.image,
            recipient: "Học viên EduChain",
            txHash: selectedItem.txHash || "",
          }}
        />
      )}

      {selectedItem && (
        <ShareNFTModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          item={{
            id: selectedItem.id,
            name: selectedItem.name,
            description: selectedItem.description,
            image: selectedItem.image,
            type: selectedItem.type,
            dateAcquired: selectedItem.dateAcquired,
            txHash: selectedItem.txHash,
          }}
        />
      )}

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedItem && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getItemIcon(selectedItem.type)}
                {selectedItem.name}
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                    selectedItem.rarity
                  )}`}
                >
                  {getRarityName(selectedItem.rarity)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Ngày nhận:</span>
                    </div>
                    <span className="text-sm font-medium">
                      {selectedItem.dateAcquired}
                    </span>
                  </div>

                  {selectedItem.txHash && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Giao dịch:</span>
                      </div>
                      <span className="text-sm font-mono truncate max-w-[150px]">
                        {selectedItem.txHash}
                      </span>
                    </div>
                  )}
                </div>

                {selectedItem.metadata && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Thông tin bổ sung</h4>
                      {Object.entries(selectedItem.metadata).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-muted-foreground capitalize">
                              {key}:
                            </span>
                            <span className="text-sm">
                              {Array.isArray(value)
                                ? value.join(", ")
                                : value.toString()}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                <span>Tải xuống</span>
              </Button>
              <Button className="gap-2" onClick={handleShareClick}>
                <Share2 className="h-4 w-4" />
                <span>Chia sẻ</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

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
          <h1 className="text-3xl font-bold mb-6">Bộ Sưu Tập Của Tôi</h1>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Chứng Chỉ NFT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {
                      collectionItems.filter(
                        (item) => item.type === "certificate"
                      ).length
                    }
                  </div>
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Huy Hiệu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {
                      collectionItems.filter((item) => item.type === "badge")
                        .length
                    }
                  </div>
                  <BadgeCheck className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Cúp Giải Thưởng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {
                      collectionItems.filter((item) => item.type === "trophy")
                        .length
                    }
                  </div>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Vật Phẩm Đặc Biệt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {
                      collectionItems.filter((item) => item.type === "special")
                        .length
                    }
                  </div>
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <TabsList className="flex w-full max-w-md rounded-lg p-1 h-auto">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedType("all")}
                  className="flex flex-col items-center justify-center py-2 px-4 h-auto"
                >
                  <Grid3X3 className="h-5 w-5 mb-1 text-gray-500" />
                  <span>Tất Cả</span>
                  <span className="text-xs text-muted-foreground">
                    ({collectionItems.length})
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="certificate"
                  onClick={() => setSelectedType("certificate")}
                  className="flex flex-col items-center justify-center py-2 px-4 h-auto"
                >
                  <Award className="h-5 w-5 mb-1 text-purple-500" />
                  <span>Chứng Chỉ</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {
                      collectionItems.filter(
                        (item) => item.type === "certificate"
                      ).length
                    }
                    )
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="badge"
                  onClick={() => setSelectedType("badge")}
                  className="flex flex-col items-center justify-center py-2 px-4 h-auto"
                >
                  <BadgeCheck className="h-5 w-5 mb-1 text-blue-500" />
                  <span>Huy Hiệu</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {
                      collectionItems.filter((item) => item.type === "badge")
                        .length
                    }
                    )
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="trophy"
                  onClick={() => setSelectedType("trophy")}
                  className="flex flex-col items-center justify-center py-2 px-4 h-auto"
                >
                  <Trophy className="h-5 w-5 mb-1 text-yellow-500" />
                  <span>Cúp</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {
                      collectionItems.filter((item) => item.type === "trophy")
                        .length
                    }
                    )
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="special"
                  onClick={() => setSelectedType("special")}
                  className="flex flex-col items-center justify-center py-2 px-4 h-auto"
                >
                  <Shield className="h-5 w-5 mb-1 text-green-500" />
                  <span>Đặc Biệt</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {
                      collectionItems.filter((item) => item.type === "special")
                        .length
                    }
                    )
                  </span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm vật phẩm..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedRarity}
                  onValueChange={setSelectedRarity}
                >
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Độ hiếm" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Độ hiếm</SelectLabel>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="common">Phổ biến</SelectItem>
                      <SelectItem value="uncommon">Không phổ biến</SelectItem>
                      <SelectItem value="rare">Hiếm</SelectItem>
                      <SelectItem value="epic">Sử thi</SelectItem>
                      <SelectItem value="legendary">Huyền thoại</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sắp xếp theo</SelectLabel>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="oldest">Cũ nhất</SelectItem>
                      <SelectItem value="rarity">Độ hiếm</SelectItem>
                      <SelectItem value="alphabetical">Tên A-Z</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {sortedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Không tìm thấy vật phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Không tìm thấy vật phẩm nào phù hợp với tiêu chí tìm kiếm
                    của bạn. Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedItems.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                            item.rarity
                          )}`}
                        >
                          {getRarityName(item.rarity)}
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          {getItemIcon(item.type)}
                          <CardTitle className="text-base truncate">
                            {item.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="truncate">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-0">
                        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                          <span>Ngày nhận: {item.dateAcquired}</span>
                          {item.txHash && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              <span>Blockchain</span>
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-accent/10 transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {getItemIcon(item.type)}
                          <h3 className="font-medium truncate">{item.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                            item.rarity
                          )}`}
                        >
                          {getRarityName(item.rarity)}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.dateAcquired}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Các tab khác sẽ hiển thị nội dung tương tự, nhưng đã được lọc bởi selectedType */}
            <TabsContent value="certificate" className="mt-0">
              {sortedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Không tìm thấy vật phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Không tìm thấy chứng chỉ nào phù hợp với tiêu chí tìm kiếm
                    của bạn.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedItems
                    .filter((item) => item.type === "certificate")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div
                            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <CardTitle className="text-base truncate">
                              {item.name}
                            </CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                            <span>Ngày nhận: {item.dateAcquired}</span>
                            {item.txHash && (
                              <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                <span>Blockchain</span>
                              </div>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedItems
                    .filter((item) => item.type === "certificate")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-accent/10 transition-colors"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <h3 className="font-medium truncate">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.dateAcquired}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="badge" className="mt-0">
              {sortedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Không tìm thấy vật phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Không tìm thấy huy hiệu nào phù hợp với tiêu chí tìm kiếm
                    của bạn.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedItems
                    .filter((item) => item.type === "badge")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div
                            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <CardTitle className="text-base truncate">
                              {item.name}
                            </CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                            <span>Ngày nhận: {item.dateAcquired}</span>
                            {item.txHash && (
                              <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                <span>Blockchain</span>
                              </div>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedItems
                    .filter((item) => item.type === "badge")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-accent/10 transition-colors"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <h3 className="font-medium truncate">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.dateAcquired}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="trophy" className="mt-0">
              {sortedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Không tìm thấy vật phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Không tìm thấy cúp nào phù hợp với tiêu chí tìm kiếm của
                    bạn.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedItems
                    .filter((item) => item.type === "trophy")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div
                            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <CardTitle className="text-base truncate">
                              {item.name}
                            </CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                            <span>Ngày nhận: {item.dateAcquired}</span>
                            {item.txHash && (
                              <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                <span>Blockchain</span>
                              </div>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedItems
                    .filter((item) => item.type === "trophy")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-accent/10 transition-colors"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <h3 className="font-medium truncate">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.dateAcquired}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="special" className="mt-0">
              {sortedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Không tìm thấy vật phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Không tìm thấy vật phẩm đặc biệt nào phù hợp với tiêu chí
                    tìm kiếm của bạn.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedItems
                    .filter((item) => item.type === "special")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div
                            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <CardTitle className="text-base truncate">
                              {item.name}
                            </CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                            <span>Ngày nhận: {item.dateAcquired}</span>
                            {item.txHash && (
                              <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                <span>Blockchain</span>
                              </div>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedItems
                    .filter((item) => item.type === "special")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-accent/10 transition-colors"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <h3 className="font-medium truncate">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                              item.rarity
                            )}`}
                          >
                            {getRarityName(item.rarity)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.dateAcquired}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
