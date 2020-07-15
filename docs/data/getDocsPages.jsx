import { frontMatter as installation } from '../pages/docs/installation.mdx';
import { frontMatter as options } from '../pages/docs/options.mdx';
import { frontMatter as license } from '../pages/docs/license.mdx';
import { frontMatter as help } from '../pages/docs/help.mdx';

export default [
  {
    slug: 'documentation',
    title: 'Documentation',
    items: [
      {
        slug: 'installation',
        url: '/docs/installation',
        ...installation,
      },
      {
        slug: 'options',
        url: '/docs/options',
        ...options,
      },
    ],
  },
  {
    slug: 'license',
    url: '/docs/license',
    ...license,
  },
  {
    slug: 'help',
    url: '/docs/help',
    ...help,
  },
];
