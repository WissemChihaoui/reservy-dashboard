import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};


export const adminNavData = [
    {
        subheader: 'Administration',
        items: [
            { title: 'Tableau De Bord', path: paths.admin.root, icon: ICONS.dashboard },
            { title: 'Accés Admins', path: paths.admin.page, icon: ICONS.user },
            { title: 'Les Propriétaires', path: paths.admin.page, icon: ICONS.user },
            { title: 'Les Etablissements', path: paths.admin.etablissements.root, icon: ICONS.user },
            { title: 'Les Clients', path: paths.admin.page, icon: ICONS.user },
            { title: 'Les Catégories', path: paths.admin.categories.root, icon: ICONS.folder}
        ],
    },
    {
        subheader: 'Marketing',
        items: [
            { title: 'Menu 1', path: paths.admin.root, icon: ICONS.dashboard },
            { title: 'Menu 2', path: paths.admin.root, icon: ICONS.dashboard },
        ]
    }, 
    {
        subheader: 'Site Client',
        items: [
            { title: 'Menu 1', path: paths.admin.root, icon: ICONS.dashboard },
            { title: 'Menu 2', path: paths.admin.root, icon: ICONS.dashboard },
        ]
    },
    {
        subheader: 'Affiliation',
        items: [
            { title: 'Menu 1', path: paths.admin.root, icon: ICONS.dashboard },
            { title: 'Menu 2', path: paths.admin.root, icon: ICONS.dashboard },
        ]
    },
    {
        subheader: 'Développement',
        items: [
            { title: 'Menu 1', path: paths.admin.root, icon: ICONS.dashboard },
            { title: 'Menu 2', path: paths.admin.root, icon: ICONS.dashboard },
        ]
    },
    {
        subheader: 'Paramètres',
        items: [
            { title: 'Menu 1', path: paths.admin.root, icon: ICONS.dashboard },
            { title: 'Menu 2', path: paths.admin.root, icon: ICONS.dashboard },
        ]
    }
]