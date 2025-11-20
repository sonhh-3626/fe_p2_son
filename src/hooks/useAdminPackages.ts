import { useAdminPackageStore } from "@/store/adminPackageStore";
import { useMemo } from "react";
import { Package } from "@/types/Package";

export const useAdminPackages = () => {
  const {
    packages,
    loading,
    searchTerm,
    locationFilter,
    sortConfig,
    currentPage,
    itemsPerPage,
    setSearchTerm,
    setLocationFilter,
    setSortConfig,
    setCurrentPage,
    fetchPackages,
  } = useAdminPackageStore();

  const processedPackages = useMemo(() => {
    let result = [...packages];

    if (searchTerm) {
      result = result.filter((pkg) =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      result = result.filter((pkg) =>
        pkg.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Package];
        const bValue = b[sortConfig.key as keyof Package];

        if (typeof aValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue);
        }

        if (typeof aValue === "number") {
          return sortConfig.direction === "asc"
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }

        return 0;
      });
    }

    return result;
  }, [packages, searchTerm, locationFilter, sortConfig]);

  const totalPages = Math.ceil(processedPackages.length / itemsPerPage);
  const paginatedPackages = processedPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    loading,
    paginatedPackages,
    totalPages,
    processedPackages,
    searchTerm,
    locationFilter,
    sortConfig,
    currentPage,

    setSearchTerm,
    setLocationFilter,
    setSortConfig,
    setCurrentPage,
    fetchPackages,
  };
};
