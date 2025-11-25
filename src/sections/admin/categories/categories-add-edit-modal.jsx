import { z as zod } from 'zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useMemo } from 'react';
import { toast } from 'sonner';
import { Field, Form } from 'src/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createCategory } from 'src/action/admins/categories';

export const CategoryFromSchema = zod.object({
  name: zod.string().min(1, { message: 'Nom est requis' }),
  slug: zod.string().min(1, { message: 'Slug est requis' }),
  descripiton: zod.string(),
  icon: zod.string(),
});

export default function CategoriesAddEditDialog({ open, onClose, category }) {
  const defaultValues = useMemo(
    () => ({
      name: category?.name || '',
      slug: category?.slug || '',
      description: category?.description || '',
      icon: category?.icon || '',
    }),
    [category]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(CategoryFromSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  });
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{category ? 'Modifier cette categorie' : 'Ajouter une categorie'}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            mt={2}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)' }}
          >
            <Field.Text name="name" label="Titre, Nom" />
            <Field.Text name="slug" label="Slug" />
            <Field.Text name="description" label="Description" />
            <Field.Text name="icon" label="Icon" helperText="utilisé icon depuis Iconify" />{' '}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <Button type="submit" variant="contained">
            {category ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
