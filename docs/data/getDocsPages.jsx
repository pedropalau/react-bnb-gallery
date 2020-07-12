import { frontMatter as installation } from '../pages/docs/installation.mdx';
import { frontMatter as options } from '../pages/docs/options.mdx';
import { frontMatter as license } from '../pages/docs/license.mdx';
import { frontMatter as help } from '../pages/docs/help.mdx';

export default [
  {
    slug: 'installation',
    data: installation,
  },
  {
    slug: 'options',
    data: options,
  },
  {
    slug: 'license',
    data: license,
  },
  {
    slug: 'help',
    data: help,
  },
];
