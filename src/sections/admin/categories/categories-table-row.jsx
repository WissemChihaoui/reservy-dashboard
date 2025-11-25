import {
  TableRow,
  TableCell,
  IconButton,
  Stack,
  Typography,
  Box,
  Checkbox,
  Tooltip,
  Link,
  Button,
} from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import CategoriesAddEditDialog from './categories-add-edit-modal';

export default function CategoriesTableRow({ row, selected, onSelectRow, onDeleteRow, onViewRow }) {
  const confirm = useBoolean();
  const open = useBoolean()

  // Format category name with icon and slug
  const categoryInfo = (
    <Stack direction="row" alignItems="center" spacing={1}>
      {row.icon && <Iconify icon={row.icon} width={24} sx={{ color: 'text.secondary' }} />}
      <Stack>
        <Typography variant="subtitle2" noWrap>
          {row.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.slug}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </TableCell>
        <TableCell>#{row.id}</TableCell>
        <TableCell>{categoryInfo}</TableCell>
        <TableCell>
          <Typography variant="body2" noWrap>
            {row.description || '-'}
          </Typography>
        </TableCell>
        <TableCell align="center">{row.display_order}</TableCell>
        <TableCell>{row.created_at ? fDate(row.created_at) : '-'}</TableCell>
        <TableCell>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Voir les sous-catégories">
              <IconButton onClick={onViewRow} color="info">
                <Iconify icon="mdi:eye-outline" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Modifier">
              <IconButton color="primary" onClick={() => open.onTrue()}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer">
              <IconButton onClick={confirm.onTrue} color="error">
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir supprimer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
      <CategoriesAddEditDialog open={open.value} onClose={() => open.onFalse()} category={row} />
    </>
  );
}
