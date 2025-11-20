export default function PriceDisplay({ price }: { price: number }) {
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);

  return <div className="font-semibold text-blue-600">{formatted}</div>;
}
