import { Helmet } from 'react-helmet-async';
import { useGetCategories } from 'src/action/admins/categories';

import { CONFIG } from 'src/config-global';

import CategoriesListView from 'src/sections/admin/categories/views/categories-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Les catégories | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    const { categories, isLoading, error } = useGetCategories();

    console.log(categories)
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <CategoriesListView categories={categories} loading={isLoading} error={error}/>
    </>
  );
}