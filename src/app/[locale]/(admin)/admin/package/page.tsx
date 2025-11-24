'use client';

import EmptyState from '@/components/admin/package/EmptyState';
import LoadingState from '@/components/admin/package/LoadingState';
import PackageFilters from '@/components/admin/package/PackageFilters';
import PageHeader from '@/components/admin/package/PageHeader';
import ResultsCount from '@/components/admin/package/ResultsCount';
import Pagination from '@/components/admin/package/Pagination';
import { Package, TableColumn } from '@/types/Package';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, MapPin, Users, Star, Eye } from 'lucide-react';
import DataTable from '@/components/commons/table/DataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminPackages } from '@/hooks/useAdminPackages';
import { useRouter } from 'next/navigation';
import DeletePackageBtn from '@/components/admin/package/DeletePackageBtn';

export default function AdminPackageListPage() {
  const t = useTranslations('PackageListPage');
  const router = useRouter();
  const {
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
    deletePackage,
  } = useAdminPackages();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleDeletePackage = async (id: number) => {
    try {
      await deletePackage(id);
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
     // CATCH HANDLE
    }
  };

  const columns: TableColumn<Package>[] = useMemo(() => [
    {
      key: 'title',
      label: t('packageColumn'),
      sortable: true,
      render: (pkg) => (
        <div className="flex items-center gap-4">
          <Image
            src={pkg.img}
            alt={pkg.title}
            width={64}
            height={64}
            quality={100}
            priority={true}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{pkg.title}</div>
            <div className="text-sm text-gray-500">{pkg.shortDescription}</div>
          </div>
        </div>
      ),
      width: '30%',
    },
    {
      key: 'location',
      label: t('locationColumn'),
      sortable: true,
      render: (pkg) => (
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          {pkg.location}
        </div>
      ),
    },
    {
      key: 'price',
      label: t('priceColumn'),
      sortable: true,
      render: (pkg) => (
        <div className="font-semibold text-blue-600">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pkg.price)}
        </div>
      ),
    },
    {
      key: 'rating',
      label: t('ratingColumn'),
      sortable: true,
      render: (pkg) => (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{pkg.rating}</span>
          <span className="text-gray-500 text-sm">({pkg.reviews})</span>
        </div>
      ),
    },
    {
      key: 'participants',
      label: t('participantsColumn'),
      sortable: true,
      render: (pkg) => (
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="w-4 h-4 text-gray-400" />
          {pkg.participants}
        </div>
      ),
    },
    {
      key: 'deadline',
      label: t('deadlineColumn'),
      sortable: true,
      render: (pkg) => (
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          {new Date(pkg.deadline).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'actions',
      label: t('actionsColumn'),
      headerAlign: 'right',
      cellAlign: 'right',
      render: (pkg) => (
        <div className="flex gap-2 justify-end">
          <Link
            href={`/admin/package/${pkg.id}`}
            className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            title={t('viewDetailsButton')}
          >
            <Eye size={20} />
          </Link>
          <DeletePackageBtn packageId={pkg.id} onDelete={handleDeletePackage} />
        </div>
      ),
    },
  ], [t, handleDeletePackage]);

  if (loading) {
    return <LoadingState />;
  }

  return (
      <div>
        <PageHeader onAddNew={() => router.push('/admin/package/new')} />

        <PackageFilters
          searchTerm={searchTerm}
          locationFilter={locationFilter}
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationFilter}
        />

        <ResultsCount
          showing={paginatedPackages.length}
          total={processedPackages.length}
        />

        {paginatedPackages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={paginatedPackages}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
  );
}
