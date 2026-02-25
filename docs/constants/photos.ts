interface GalleryPhoto {
	photo?: string;
	caption?: string;
	number?: number;
	subcaption?: string;
	thumbnail?: string;
	[key: string]: unknown;
}

const photos: GalleryPhoto[] = [
	{
		photo:
			'https://images.unsplash.com/photo-1470238660368-09dd17cab0b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Sunset',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1565472604484-fd8b0414aaf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Venom',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1594240094495-1b9177b5fefc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Beach',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593773271567-b13ceb8ce8ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1204&q=100',
		caption: 'Summer & Earth Colors',
		subcaption: 'By @cbarbalis',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593200931138-001b51a74284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Paceful',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593616471742-f31639185abd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Wonderful View',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593270573246-2dca2f2c1c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=100',
		caption: 'Quite Night',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1592407815059-d10df1905661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Alone',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1592334454447-7d0aa7feda01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Colors',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1591981093673-984cd7de9ca4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Health Green',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1591254267182-4211662a0c00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Pretty Green',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593286880275-cc4aee0fb836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Cold Forest',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593616469718-20c25ba3d611?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
		caption: 'White',
	},
];

export default photos;
