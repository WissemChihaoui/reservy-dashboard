import { Box, Button, Card, IconButton, Stack, Table, TableBody, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  emptyRows,
  getComparator,
  rowInPage,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/admin';
import { paths } from 'src/routes/paths';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';
import { useRouter } from 'src/routes/hooks';
import { toast } from 'sonner';
import { RouterLink } from 'src/routes/components';
import EtablissementsTableRow from '../etablissements-table-row';
import EtablissementsToolbar from '../etablissements-toolbar';
import EtablissementTableFiltersResult from '../etablissements-table-filter-result';

const TABLE_HEAD = [
  { id: 'id', label: '#', width: 60 },
  { id: 'name', label: 'Nom' },
  { id: 'contact', label: 'Contact' },
  { id: 'owner', label: 'Propriétaire' },
  { id: 'createdAt', label: 'Creér le' },
  { id: 'status', label: 'Statut' },
  { id: '', width: 88 },
];
export default function EtablissementsListView({ etablissement = [], loading, error }) {
  const [tableData, setTableData] = useState(etablissement);

  useEffect(() => {
    setTableData(etablissement);
  }, [etablissement]);

  const table = useTable({ defaultOrderBy: 'createdAt' });

  const confirm = useBoolean();
  const router = useRouter();

  const filters = useSetState({
    name: '',
    city: [],
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    !!filters.state.city.length ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.admin.root);
    },
    [router]
  );

  console.log(tableData);
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Liste des établissements"
        links={[
          { name: 'Tableau de bord', href: paths.admin.root },
          { name: 'Les établissements' },
        ]}
        action={
          <Stack direction="row" spacing={2}>
            <Button variant='contained' href={paths.admin.root} LinkComponent={RouterLink}>Les Propriétaires</Button>
            <Button variant='contained' color='primary' href={paths.admin.etablissements} LinkComponent={RouterLink}>Ajouter un établissement</Button>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <EtablissementsToolbar
          filters={filters}
          dateError={dateError}
          onResetPage={table.onResetPage}
          options={{ cities : ['Tunis']}}
        />
        {canReset && (
            <EtablissementTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />
          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <EtablissementsTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, city, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by name (etablissement name)
  if (name) {
    inputData = inputData.filter(
      (etablissement) =>
        etablissement.name.toLowerCase().includes(name.toLowerCase())  || etablissement.owner?.name?.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (city.length) {
  inputData = inputData.filter((etab) => 
    city.some(selectedCity => 
      etab.location?.city?.toLowerCase() === selectedCity.toLowerCase()
    )
  );
}

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((etablissement) => etablissement.status === status);
  }

  // Filter by date range
  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.created_at, startDate, endDate));
    }
  }

  return inputData;
}
