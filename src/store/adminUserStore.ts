import { create } from "zustand";
import { User } from "@/types/User";
import { SortConfig, SortDirection } from "@/types/Package";
import { fetchUsers } from "@/libs/api/users";

type AdminUserState = {
  users: User[];
  loading: boolean;
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  sortConfig: SortConfig;
  currentPage: number;
  itemsPerPage: number;

  fetchUsers: () => Promise<void>;
  setSearchTerm: (s: string) => void;
  setRoleFilter: (r: string) => void;
  setStatusFilter: (s: string) => void;
  setSortConfig: (key: string) => void;
  setCurrentPage: (p: number) => void;
};

export const useAdminUserStore = create<AdminUserState>((set, get) => ({
  users: [],
  loading: false,
  searchTerm: "",
  roleFilter: "",
  statusFilter: "",
  sortConfig: { key: "name", direction: "asc" },
  currentPage: 1,
  itemsPerPage: 5,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const data = await fetchUsers();
      if (data) {
        set({ users: data });
      }
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (s) => set({ searchTerm: s, currentPage: 1 }),
  setRoleFilter: (r) => set({ roleFilter: r, currentPage: 1 }),
  setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
  setSortConfig: (key) =>
    set((state) => {
      let direction: SortDirection = "asc";
      if (state.sortConfig.key === key && state.sortConfig.direction === "asc") {
        direction = "desc";
      }
      return { sortConfig: { key, direction }, currentPage: 1 };
    }),
  setCurrentPage: (p) => set({ currentPage: p }),
}));
