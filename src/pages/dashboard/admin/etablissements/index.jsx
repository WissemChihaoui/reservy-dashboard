import { Helmet } from 'react-helmet-async';
import { useGetEtablissements } from 'src/action/admins/etablissements';

import { CONFIG } from 'src/config-global';
import EtablissementsListView from 'src/sections/admin/etablissements/views/etablissements-list-view';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des établissements | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    const { etablissements, isLoading, error } = useGetEtablissements()
    // console.log(etablissements)
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <EtablissementsListView etablissement={etablissements} loading={isLoading} error={error} />
    </>
  );
}