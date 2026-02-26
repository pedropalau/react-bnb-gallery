'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const SIDEBAR_DOCS_SECTIONS = [
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

export function SidebarDocs({
	className,
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar
			className={cn(
				'sticky top-5 z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex',
				className,
			)}
			collapsible="none"
			{...props}
		>
			<div className="h-9" />
			<div className="from-background via-background/80 to-background/50 absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b blur-xs" />
			<div className="via-border absolute top-12 right-2 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent to-transparent lg:flex" />
			<SidebarContent className="no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden">
				<SidebarGroup className="pt-6">
					<SidebarGroupLabel className="text-muted-foreground font-medium mb-4">
						Documentation
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-2">
							{SIDEBAR_DOCS_SECTIONS.map((item) => {
								return (
									<SidebarMenuItem key={item.slug}>
										<SidebarMenuButton
											asChild
											isActive={
												item.url === '/docs'
													? pathname === item.url
													: pathname.startsWith(item.url)
											}
											className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:w-full 3xl:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
										>
											<Link href={item.url}>
												<span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
												{item.title}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

export default SidebarDocs;
