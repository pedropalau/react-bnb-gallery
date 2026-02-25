'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

import { Logo } from './logo';
import { SocialLinks } from './social-links';

export function SiteHeader({
	className,
	...rest
}: React.ComponentPropsWithRef<'header'>) {
	return (
		<header
			data-slot="site-header"
			className={cn(
				'h-16 w-full overflow-hidden lg:h-20 lg:py-6 flex items-center',
				className,
			)}
			{...rest}
		>
			<div className="container mx-auto max-w-screen-lg px-6 md:px-10">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center">
						<Link href="/" title="Home" className="inline-flex pl-6 md:pl-0">
							<Logo />
						</Link>
					</div>
					<SocialLinks />
				</div>
			</div>
		</header>
	);
}

export default SiteHeader;
