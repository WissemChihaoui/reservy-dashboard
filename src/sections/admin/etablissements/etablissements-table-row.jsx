import {
  TableRow,
  TableCell,
  IconButton,
  Stack,
  Typography,
  Box,
  Checkbox,
  Avatar,
  Link,
  Button,
} from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';

export default function EtablissementsTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}) {
  const confirm = useBoolean();

  // Format the contact information
  const contactInfo = (
    <Box>
      {row.phone && <div>{row.phone}</div>}
      {row.email && <div>{row.email}</div>}
    </Box>
  );

  // Format the owner information
  const ownerInfo = row.owner ? (
    <Link component={RouterLink} href={paths.admin.root} color="inherit" underline="none">
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar alt={row.owner.name} src={row.owner.avatarUrl} />

        <Stack
          sx={{
            typography: 'body2',
            flex: '1 1 auto',
            alignItems: 'flex-start',
          }}
        >
          <Box component="span">{row.owner.name}</Box>
          <Box component="span" sx={{ color: 'text.disabled' }}>
            {row.owner.email}
          </Box>
        </Stack>
      </Stack>
    </Link>
  ) : null;

  // Format the status with appropriate styling
  const statusColor =
    row.status === 'active' ? 'success' : row.status === 'suspended' ? 'warning' : 'error';

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
        <TableCell>{row.id}</TableCell>
        <TableCell>
          <Link component={RouterLink} href={paths.admin.root} variant="subtitle2">
            {row.name}
          </Link>
          {row.location?.city && (
            <Typography variant="caption" color="text.secondary" display="block">
              {row.location.city}
            </Typography>
          )}
        </TableCell>
        <TableCell>{contactInfo}</TableCell>
        <TableCell>{ownerInfo}</TableCell>
        <TableCell>{row.created_at ? fDate(row.created_at) : '-'}</TableCell>
        <TableCell>
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: (theme) => theme.palette[statusColor].light,
              color: (theme) => theme.palette[statusColor].darker,
              textTransform: 'capitalize',
              fontSize: '0.75rem',
              fontWeight: 'medium',
            }}
          >
            {row.status || 'inactive'}
          </Box>
        </TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => onViewRow(row.id)}
            size="small"
            color="primary"
            sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
          >
            <Iconify icon="solar:eye-bold" />
          </IconButton>
          <IconButton
            onClick={() => confirm.onTrue()}
            size="small"
            color="error"
            sx={{ '&:hover': { bgcolor: 'error.lighter' } }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
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
    </>
  );
}
