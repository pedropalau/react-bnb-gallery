export interface DocsSubItem {
	slug: string;
	url: string;
	title: string;
}

export interface DocsNavItem {
	slug: string;
	title: string;
	url?: string;
	items?: DocsSubItem[];
}

const docsPages: DocsNavItem[] = [
	{
		slug: 'documentation',
		title: 'Documentation',
		items: [
			{
				slug: 'installation',
				url: '/docs/installation',
				title: 'Installation',
			},
			{
				slug: 'options',
				url: '/docs/options',
				title: 'Options',
			},
		],
	},
	{
		slug: 'license',
		url: '/docs/license',
		title: 'License',
	},
	{
		slug: 'help',
		url: '/docs/help',
		title: 'Help',
	},
];

export default docsPages;
