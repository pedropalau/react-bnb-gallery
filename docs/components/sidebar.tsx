import type { DocsNavItem } from '../data/getDocsPages';
import Navigation from './navigation';

interface SidebarProps {
	menu?: DocsNavItem[] | null;
}

export default function Sidebar({ menu = null }: SidebarProps) {
	if (!menu) {
		return null;
	}

	return (
		<div className="h-full overflow-y-auto scrolling-touch bg-white lg:block lg:h-auto lg:sticky lg:top-16 lg:bg-transparent">
			<Navigation menu={menu} />
		</div>
	);
}
