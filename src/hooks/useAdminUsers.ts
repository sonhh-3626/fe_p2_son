import { useEffect, useMemo } from 'react';
import { useAdminUserStore } from '@/store/adminUserStore';
import { User } from '@/types/User';
import { SortConfig } from '@/types/Package';

interface UseAdminUsersReturn {
  loading: boolean;
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  sortConfig: SortConfig;
  currentPage: number;
  paginatedUsers: User[];
  processedUsers: User[];
  totalPages: number;
  handleSearchChange: (value: string) => void;
  handleRoleChange: (value: string) => void;
  handleStatusChange: (value: string) => void;
  handleSort: (key: string) => void;
  handlePageChange: (page: number) => void;
}

const itemsPerPage = 5;

export default function useAdminUsers(): UseAdminUsersReturn {
  const {
    users,
    loading,
    searchTerm,
    roleFilter,
    statusFilter,
    sortConfig,
    currentPage,
    fetchUsers,
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
    setSortConfig,
    setCurrentPage,
  } = useAdminUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSort = (key: string) => {
    setSortConfig(key);
  };

  const processedUsers = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter(user => user.role === roleFilter);
    }

    if (statusFilter) {
      result = result.filter(user => user.status === statusFilter);
    }

    if (sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof User];
        const bValue = b[sortConfig.key as keyof User];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    return result;
  }, [users, searchTerm, roleFilter, statusFilter, sortConfig]);

  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);
  const paginatedUsers = processedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    loading,
    searchTerm,
    roleFilter,
    statusFilter,
    sortConfig,
    currentPage,
    paginatedUsers,
    processedUsers,
    totalPages,
    handleSearchChange: setSearchTerm,
    handleRoleChange: setRoleFilter,
    handleStatusChange: setStatusFilter,
    handleSort,
    handlePageChange: setCurrentPage,
  };
}
