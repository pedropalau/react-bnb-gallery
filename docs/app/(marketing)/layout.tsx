import { SiteHeader } from '@/components/site-header';

export default function MarketingLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="bg-background relative z-10 flex min-h-svh flex-col">
			<SiteHeader />
			<main>{children}</main>
		</div>
	);
}
