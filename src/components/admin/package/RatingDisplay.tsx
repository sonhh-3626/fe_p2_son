import { LuStar } from "react-icons/lu";

export default function RatingDisplay({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <LuStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="font-medium">{rating}</span>
      <span className="text-gray-500 text-sm">({reviews})</span>
    </div>
  );
}
