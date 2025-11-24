import GenericPageDetail from "@/components/admin/layout/GenericPageDetail";
import { MainContent } from "@/components/admin/layout/MainContent";

export default function AdminBookingPage() {
  return (
    <MainContent>
      <GenericPageDetail
        title="Quản lý Booking"
        description="Xem và xử lý các đơn đặt chỗ của khách hàng."
      />
    </MainContent>
  )
}
