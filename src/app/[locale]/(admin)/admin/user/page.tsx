'use client';

import { TableColumn } from '@/types/Package';
import { User } from '@/types/User';
import Pagination from '@/components/admin/package/Pagination';
import ActionButton from '@/components/admin/package/ActionButton';
import PageHeader from '@/components/admin/commons/PageHeader';
import LoadingState from '@/components/admin/package/LoadingState';
import ResultsCount from '@/components/admin/package/ResultsCount';
import EmptyState from '@/components/admin/package/EmptyState';
import DataTable from '@/components/commons/table/DataTable';
import UserInfo from '@/components/admin/user/UserInfo';
import RoleBadge from '@/components/admin/user/RoleBadge';
import StatusBadge from '@/components/admin/user/StatusBadge';
import UserFilters from '@/components/admin/user/UserFilters';
import useAdminUsers from '@/hooks/useAdminUsers';
import { useTranslations } from 'next-intl';

export default function AdminUserListPage() {
  const t = useTranslations('admin.users');
  const {
    loading,
    searchTerm,
    roleFilter,
    statusFilter,
    sortConfig,
    currentPage,
    paginatedUsers,
    processedUsers,
    totalPages,
    handleSearchChange,
    handleRoleChange,
    handleStatusChange,
    handleSort,
    handlePageChange,
  } = useAdminUsers();

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      label: t('table.columns.user'),
      sortable: true,
      render: (user) => (
        <UserInfo avatar={user.avatar || ''} name={user.name} email={user.email} />
      ),
      width: '30%',
    },
    {
      key: 'role',
      label: t('table.columns.role'),
      sortable: true,
      render: (user) => <RoleBadge role={user.role} />,
    },
    {
      key: 'status',
      label: t('table.columns.status'),
      sortable: true,
      render: (user) => <StatusBadge status={user.status} />,
    },
    {
      key: 'actions',
      label: t('table.columns.actions'),
      headerAlign: 'right',
      cellAlign: 'right',
      render: (user) => (
        <div className="flex gap-2 justify-end">
          <ActionButton onClick={() => handleViewDetails(user.id)}>
            {t('table.actions.view')}
          </ActionButton>
          <ActionButton onClick={() => handleEdit(user.id)} variant="secondary">
            {t('table.actions.edit')}
          </ActionButton>
        </div>
      ),
    },
  ];

  const handleViewDetails = (id: number) => {
    console.log(t('alerts.viewDetailsLog', { id }));
    alert(t('alerts.viewDetails', { id }));
  };

  const handleEdit = (id: number) => {
    console.log(t('alerts.editLog', { id }));
    alert(t('alerts.edit', { id }));
  };

  const handleAddNew = () => {
    console.log(t('alerts.addNewLog'));
    alert(t('alerts.addNewFeature'));
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="">
      <PageHeader
        title={t('pageHeader.title')}
        buttonText={t('pageHeader.addNewButton')}
        onAddNew={handleAddNew}
      />

      <UserFilters
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
      />

      <ResultsCount
        showing={paginatedUsers.length}
        total={processedUsers.length}
      />

      {paginatedUsers.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={paginatedUsers}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
