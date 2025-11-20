interface PriceBadgeProps {
  price: number;
}

export default function PriceBadge({ price }: PriceBadgeProps) {
  return (
    <span className="px-3 py-1 rounded-full text-sm font-semibold text-green-700 bg-green-100">
      ${price.toLocaleString()}
    </span>
  );
}
