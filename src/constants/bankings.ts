export interface Bank {
  code: string;
  shortName: string;
  fullName: string;
  logo?: string;
}

export const VIETNAM_BANKS: Bank[] = [
  { code: 'VCB', shortName: 'Vietcombank', fullName: 'Ngân hàng TMCP Ngoại thương Việt Nam' },
  { code: 'TCB', shortName: 'Techcombank', fullName: 'Ngân hàng TMCP Kỹ thương Việt Nam' },
  { code: 'BIDV', shortName: 'BIDV', fullName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam' },
  { code: 'VTB', shortName: 'Vietinbank', fullName: 'Ngân hàng TMCP Công thương Việt Nam' },
  { code: 'ACB', shortName: 'ACB', fullName: 'Ngân hàng TMCP Á Châu' },
  { code: 'MB', shortName: 'MBBank', fullName: 'Ngân hàng TMCP Quân đội' },
  { code: 'VPB', shortName: 'VPBank', fullName: 'Ngân hàng TMCP Việt Nam Thịnh Vượng' },
  { code: 'TPB', shortName: 'TPBank', fullName: 'Ngân hàng TMCP Tiên Phong' },
  { code: 'STB', shortName: 'Sacombank', fullName: 'Ngân hàng TMCP Sài Gòn Thương Tín' },
  { code: 'HDB', shortName: 'HDBank', fullName: 'Ngân hàng TMCP Phát triển TP.HCM' },
  { code: 'AGRI', shortName: 'Agribank', fullName: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam' },
  { code: 'OCB', shortName: 'OCB', fullName: 'Ngân hàng TMCP Phương Đông' },
  { code: 'MSB', shortName: 'MSB', fullName: 'Ngân hàng TMCP Hàng Hải' },
  { code: 'NAB', shortName: 'NamABank', fullName: 'Ngân hàng TMCP Nam Á' },
  { code: 'VAB', shortName: 'VietABank', fullName: 'Ngân hàng TMCP Việt Á' },
  { code: 'VIB', shortName: 'VIB', fullName: 'Ngân hàng TMCP Quốc tế' },
  { code: 'SHB', shortName: 'SHB', fullName: 'Ngân hàng TMCP Sài Gòn - Hà Nội' },
  { code: 'EIB', shortName: 'Eximbank', fullName: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam' },
  { code: 'SEA', shortName: 'SeABank', fullName: 'Ngân hàng TMCP Đông Nam Á' },
  { code: 'ABB', shortName: 'ABBANK', fullName: 'Ngân hàng TMCP An Bình' },
  { code: 'LPB', shortName: 'LienVietPostBank', fullName: 'Ngân hàng TMCP Bưu điện Liên Việt' },
  { code: 'SCB', shortName: 'SCB', fullName: 'Ngân hàng TMCP Sài Gòn' },
  { code: 'PGB', shortName: 'PGBank', fullName: 'Ngân hàng TMCP Xăng dầu Petrolimex' },
  { code: 'BVB', shortName: 'BaoVietBank', fullName: 'Ngân hàng TMCP Bảo Việt' },
  { code: 'KLB', shortName: 'KienLongBank', fullName: 'Ngân hàng TMCP Kiên Long' },
  { code: 'VAR', shortName: 'VietBank', fullName: 'Ngân hàng TMCP Việt Nam Thương Tín' },
  { code: 'GPB', shortName: 'GPBank', fullName: 'Ngân hàng TMCP Dầu khí Toàn Cầu' },
  { code: 'BAB', shortName: 'BacABank', fullName: 'Ngân hàng TMCP Bắc Á' },
  { code: 'PVC', shortName: 'PVcomBank', fullName: 'Ngân hàng TMCP Đại Chúng Việt Nam' },
  { code: 'CAKE', shortName: 'Cake by VPBank', fullName: 'Ngân hàng số CAKE by VPBank' },
  { code: 'TIMO', shortName: 'Timo', fullName: 'Ngân hàng số Timo by Ban Viet Bank' },
  { code: 'UBANK', shortName: 'Ubank', fullName: 'Ngân hàng số Ubank by VPBank' },
];

export function searchBanks(query: string): Bank[] {
  if (!query || query.length < 1) {
    return VIETNAM_BANKS;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return VIETNAM_BANKS.filter((bank) => {
    return (
      bank.shortName.toLowerCase().includes(normalizedQuery) ||
      bank.fullName.toLowerCase().includes(normalizedQuery) ||
      bank.code.toLowerCase().includes(normalizedQuery)
    );
  });
}
