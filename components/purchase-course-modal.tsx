"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  BookOpen,
  Check,
  Coins,
  Info,
  Loader2,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface PurchaseCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
}

export function PurchaseCourseModal({
  isOpen,
  onClose,
  course,
}: PurchaseCourseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userEduBalance = 500; // Giả định số dư EDU hiện tại của người dùng
  const hasEnoughBalance = userEduBalance >= course.price;

  const handlePurchase = () => {
    if (!hasEnoughBalance) {
      setError("Số dư EDU không đủ để mua khóa học này");
      return;
    }

    setError(null);
    setIsProcessing(true);

    // Giả lập quá trình mua khóa học
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);

      // Đóng modal sau khi mua thành công
      setTimeout(() => {
        onClose();
        setIsPurchased(false);
      }, 3000);
    }, 2000);
  };

  // Giả lập nội dung khóa học
  const courseModules = [
    {
      title: "Giới thiệu về khóa học",
      lessons: [
        "Tổng quan khóa học",
        "Cài đặt môi trường",
        "Tài liệu và tài nguyên",
      ],
    },
    {
      title: "Kiến thức nền tảng",
      lessons: [
        "Lý thuyết cơ bản",
        "Các thuật toán quan trọng",
        "Ứng dụng thực tế",
        "Bài tập thực hành",
      ],
    },
    {
      title: "Kiến thức chuyên sâu",
      lessons: [
        "Mô hình nâng cao",
        "Nghiên cứu trường hợp",
        "Phân tích chi tiết",
        "Workshop 1",
        "Workshop 2",
      ],
    },
    {
      title: "Dự án thực tế",
      lessons: [
        "Thiết kế dự án",
        "Triển khai",
        "Đánh giá hiệu suất",
        "Tối ưu hóa",
      ],
    },
    {
      title: "Chứng chỉ và đánh giá",
      lessons: ["Đánh giá cuối kỳ", "Nhận xét dự án", "Cấp chứng chỉ NFT"],
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mua khóa học</DialogTitle>
          <DialogDescription>
            Xem chi tiết và xác nhận mua khóa học
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Thông tin khóa học */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3 h-40 md:h-auto relative rounded-md overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="md:w-2/3 space-y-3">
              <div>
                <h2 className="text-xl font-bold">{course.title}</h2>
                <div className="flex items-center gap-1 text-sm">
                  <span>{course.provider}</span>
                  {course.verified && (
                    <Check className="h-3 w-3 text-blue-500" />
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                {course.categories.map((category: string) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({course.ratingCount} đánh giá)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Nội dung khóa học */}
          <div>
            <h3 className="font-medium mb-2">Nội dung khóa học</h3>
            <Accordion type="single" collapsible className="w-full">
              {courseModules.map((module, index) => (
                <AccordionItem key={index} value={`module-${index}`}>
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {module.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 text-sm">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Separator />

          {/* Thông tin chứng chỉ */}
          <div className="space-y-2">
            <h3 className="font-medium">Chứng chỉ</h3>
            <div className="flex items-start gap-3 p-3 border rounded-md bg-gray-50">
              <Award className="h-10 w-10 text-purple-500 shrink-0" />
              <div>
                <h4 className="font-medium">
                  Chứng chỉ NFT sau khi hoàn thành
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hoàn thành khóa học để nhận chứng chỉ NFT xác thực kỹ năng của
                  bạn trên blockchain Cardano. Chứng chỉ NFT được xác thực bởi{" "}
                  {course.provider} và có thể chia sẻ với nhà tuyển dụng.
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin thanh toán */}
          <Alert variant="outline">
            <Info className="h-4 w-4" />
            <AlertTitle>Thông tin thanh toán</AlertTitle>
            <AlertDescription>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center justify-between">
                  <span>Giá khóa học:</span>
                  <span className="font-medium">
                    {course.originalPrice} EDU
                  </span>
                </div>
                {course.originalPrice > course.price && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{course.originalPrice - course.price} EDU</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Tổng cộng:</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span>{course.price} EDU</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Số dư hiện tại:</span>
                  <span
                    className={
                      hasEnoughBalance ? "text-green-600" : "text-red-600"
                    }
                  >
                    {userEduBalance} EDU
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Hủy
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={isProcessing || isPurchased || !hasEnoughBalance}
            className="min-w-[140px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : isPurchased ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Đã mua thành công
              </>
            ) : (
              <>
                <Coins className="h-4 w-4 mr-2" />
                Mua khóa học
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
