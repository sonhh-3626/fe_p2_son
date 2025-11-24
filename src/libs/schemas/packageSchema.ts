import z from "zod";

export const packageSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  price: z.number().min(0, 'Giá phải lớn hơn 0'),
  rating: z.number().min(0).max(5).default(0),
  reviews: z.number().default(0),
  participants: z.number().min(1, 'Phải có ít nhất 1 người'),
  deadline: z.string().optional(),
  shortDescription: z.string().optional(),
  img: z.string().url('URL ảnh đại diện không hợp lệ').min(1, 'Ảnh đại diện là bắt buộc'),
  destination: z.string().optional(),
  departure: z.string().optional(),
  departureTime: z.string().optional(),
  returnTime: z.string().optional(),
  dressCode: z.string().optional(),
  description: z.string().optional(),
  included: z.array(z.string()).default([]),
  notIncluded: z.array(z.string()).default([]),
  packagePlans: z.array(z.object({
    day: z.number(),
    title: z.string().min(1, 'Tiêu đề ngày không được để trống'),
    description: z.string().optional(),
    activities: z.array(z.string())
  })).default([]),
  images: z.array(z.string()).default([]),
  location: z.string().optional(),
  mapUrl: z.string().optional(),
});

export type PackageFormData = z.infer<typeof packageSchema>;
