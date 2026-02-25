'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

import Logo from './logo';
import Social from './social';

export function SiteHeader({
	menuOpened = false,
	showMenuControls = true,
	fixed = false,
	onMenuOpen,
	onMenuClose,
}: {
	menuOpened?: boolean;
	showMenuControls?: boolean;
	fixed?: boolean;
	onMenuOpen?: () => void;
	onMenuClose?: () => void;
}) {
	return (
		<header
			className={cn(
				'h-16 w-full overflow-hidden border-b border-gray-200 bg-white lg:h-20 lg:py-6',
				!fixed && 'relative',
				fixed && 'fixed left-0 top-0',
			)}
		>
			<div className="container mx-auto max-w-screen-lg px-6 md:px-10">
				<div className="flex items-center -mx-6 md:mx-0">
					<div className="flex flex-1">
						<Link href="/" title="Home" className="inline-flex pl-6 md:pl-0">
							<Logo />
						</Link>
					</div>
					<Social />
					{showMenuControls ? (
						<div className="flex">
							{!menuOpened ? (
								<button
									onClick={() => onMenuOpen?.()}
									className="flex items-center p-6 text-gray-500 focus:text-gray-700 focus:outline-none lg:hidden"
									type="button"
								>
									<svg
										className="h-4 w-4 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
									</svg>
								</button>
							) : (
								<button
									onClick={() => onMenuClose?.()}
									className="flex items-center p-6 text-gray-500 focus:text-gray-700 focus:outline-none lg:hidden"
									type="button"
								>
									<svg
										className="h-4 w-4 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
									</svg>
								</button>
							)}
						</div>
					) : null}
				</div>
			</div>
		</header>
	);
}

export default SiteHeader;
