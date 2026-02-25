import classnames from 'classnames';

export function Logo({ responsive = true }: { responsive?: boolean }) {
	return (
		<div className="flex items-center">
			<img
				alt="bnbgallery"
				src="/logo.svg"
				className={classnames(
					'h-auto w-48 max-w-full',
					responsive && 'hidden md:block',
				)}
			/>
			{responsive && (
				<img
					alt="bnbgallery"
					src="/favicon-32x32.png"
					className="block h-10 w-10 md:hidden"
				/>
			)}
		</div>
	);
}

export default Logo;
