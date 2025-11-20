import { create } from 'zustand';
import { Package, SortConfig, SortDirection } from '@/types/Package';

type AdminPackageState = {
  packages: Package[];
  loading: boolean;
  searchTerm: string;
  locationFilter: string;
  sortConfig: SortConfig;
  currentPage: number;
  itemsPerPage: number;

  fetchPackages: () => Promise<void>;
  setSearchTerm: (s: string) => void;
  setLocationFilter: (l: string) => void;
  setSortConfig: (key: string) => void;
  setCurrentPage: (p: number) => void;
};

export const useAdminPackageStore = create<AdminPackageState>((set, get) => ({
  packages: [],
  loading: false,
  searchTerm: '',
  locationFilter: '',
  sortConfig: { key: 'title', direction: 'asc' },
  currentPage: 1,
  itemsPerPage: 5,

  fetchPackages: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/admin/package');
      const data: Package[] = await res.json();
      set({ packages: data });
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (s) => set({ searchTerm: s, currentPage: 1 }),
  setLocationFilter: (l) => set({ locationFilter: l, currentPage: 1 }),
  setSortConfig: (key) =>
    set((state) => {
      let direction: SortDirection = 'asc';
      if (state.sortConfig.key === key && state.sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      return { sortConfig: { key, direction }, currentPage: 1 };
    }),
  setCurrentPage: (p) => set({ currentPage: p }),
}));
