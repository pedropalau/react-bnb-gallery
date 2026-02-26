import { CodeBlock } from '@/components/code-block';
import { DocsPage } from '@/components/docs-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('Options');

const galleryProps = [
	{ prop: 'activePhotoIndex', type: 'number', default: '0' },
	{ prop: 'activePhotoPressed', type: '() => void', default: 'undefined' },
	{ prop: 'backgroundColor', type: 'string', default: "'rgba(0,0,0,1)'" },
	{ prop: 'direction', type: 'string', default: "'forwards'", deprecated: true },
	{ prop: 'keyboard', type: 'boolean', default: 'true' },
	{ prop: 'leftKeyPressed', type: '() => void', default: 'undefined' },
	{ prop: 'light', type: 'boolean', default: 'false' },
	{ prop: 'nextButtonPressed', type: '() => void', default: 'undefined' },
	{ prop: 'onClose', type: '() => void', default: 'undefined' },
	{ prop: 'opacity', type: 'number', default: '1' },
	{ prop: 'photos', type: 'string | GalleryPhoto | Array<...>', default: '[]' },
	{ prop: 'phrases', type: 'GalleryPhrases', default: '{...}' },
	{ prop: 'preloadSize', type: 'number', default: '5' },
	{ prop: 'prevButtonPressed', type: '() => void', default: 'undefined' },
	{ prop: 'rightKeyPressed', type: '() => void', default: 'undefined' },
	{ prop: 'show', type: 'boolean', default: 'false' },
	{ prop: 'showThumbnails', type: 'boolean', default: 'true' },
	{ prop: 'wrap', type: 'boolean', default: 'false' },
	{ prop: 'zIndex', type: 'number', default: '2000' },
];

const photoProps = [
	{ prop: 'photo', type: 'string', default: 'undefined' },
	{ prop: 'number', type: 'number', default: 'undefined' },
	{ prop: 'alt', type: 'string', default: 'undefined' },
	{ prop: 'thumbnailAlt', type: 'string', default: 'undefined' },
	{ prop: 'caption', type: 'ReactNode', default: 'undefined' },
	{ prop: 'subcaption', type: 'ReactNode', default: 'undefined' },
	{ prop: 'thumbnail', type: 'string', default: 'undefined' },
];

function PropsTable({
	rows,
}: {
	rows: { prop: string; type: string; default: string; deprecated?: boolean }[];
}) {
	return (
		<div className="overflow-hidden rounded-lg border border-border">
			<table className="w-full">
				<thead>
					<tr className="border-b border-border">
						<th className="px-4 py-3 text-left font-semibold text-foreground">
							Prop
						</th>
						<th className="px-4 py-3 text-left font-semibold text-foreground">
							Type
						</th>
						<th className="px-4 py-3 text-left font-semibold text-foreground">
							Default
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr
							key={row.prop}
							className={i < rows.length - 1 ? 'border-b border-border' : ''}
						>
							<td className="px-4 py-2">
								<div className="flex items-center gap-2">
									<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
										{row.prop}
									</code>
									{row.deprecated && (
										<span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
											deprecated
										</span>
									)}
								</div>
							</td>
							<td className="px-4 py-2">
								<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
									{row.type}
								</code>
							</td>
							<td className="px-4 py-2">
								<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
									{row.default}
								</code>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function PropDetail({
	name,
	deprecated,
	children,
}: {
	name: string;
	deprecated?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<h3
					id={name}
					className="scroll-m-24 font-mono text-base font-medium text-foreground"
				>
					{name}
				</h3>
				{deprecated && (
					<span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
						deprecated
					</span>
				)}
			</div>
			<div className="flex flex-col gap-3 text-sm text-muted-foreground">
				{children}
			</div>
		</div>
	);
}

export default function OptionsPage() {
	return (
		<DocsPage
			title="Options"
			description="A full reference of all available props to configure and customize the gallery."
			path="options"
		>
			<div className="flex flex-col gap-12">
				{/* Gallery props */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h2 className="text-lg font-semibold tracking-tight">
							Gallery props
						</h2>
						<PropsTable rows={galleryProps} />
					</div>

					<div className="flex flex-col gap-8">
						<PropDetail name="activePhotoIndex">
							<p>
								The index of the photo to display when the gallery opens. Useful
								when opening from a specific item in a photo grid.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  activePhotoIndex={2}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  activePhotoIndex={2}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="activePhotoPressed">
							<p>
								Callback fired when the user clicks on the currently active
								photo.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  activePhotoPressed={(index) => console.log('Pressed:', index)}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  activePhotoPressed={(index) => console.log('Pressed:', index)}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="backgroundColor">
							<p>
								Sets the background color of the gallery overlay. Accepts any
								valid CSS color value — hex, rgb, rgba, hsl, etc.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  backgroundColor="rgba(15, 15, 30, 0.95)"
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  backgroundColor="rgba(15, 15, 30, 0.95)"
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="direction" deprecated>
							<p>
								Controls the animation direction when navigating between
								photos. This prop is deprecated and will be removed in the
								next major version — avoid using it in new code.
							</p>
						</PropDetail>

						<PropDetail name="keyboard">
							<p>
								When enabled, the gallery responds to keyboard arrow key
								navigation and the <code>Escape</code> key to close. Disable if
								you need to handle keyboard events yourself.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  keyboard={false}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  keyboard={false}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="leftKeyPressed">
							<p>
								Callback fired when the left arrow key is pressed. Can be used
								to sync external state alongside the built-in navigation.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  leftKeyPressed={() => console.log('Left key pressed')}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  leftKeyPressed={() => console.log('Left key pressed')}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="light">
							<p>
								Enables a light color scheme for the gallery UI. By default
								the gallery uses a dark theme. Set to <code>true</code> to
								switch to a light background with dark controls.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  light
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  light
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="nextButtonPressed">
							<p>
								Callback fired when the next <code>→</code> control button is
								clicked.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  nextButtonPressed={() => console.log('Next clicked')}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  nextButtonPressed={() => console.log('Next clicked')}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="onClose">
							<p>
								Called when the gallery requests to be closed — via the close
								button or pressing <code>Escape</code>. Use this to update your
								state and unmount the gallery.
							</p>
							<CodeBlock
								__raw__={`const [open, setOpen] = useState(false);

<ReactBnbGallery
  show={open}
  photos={photos}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`const [open, setOpen] = useState(false);

<ReactBnbGallery
  show={open}
  photos={photos}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="opacity">
							<p>
								Controls the opacity of the gallery overlay. Accepts values
								between <code>0</code> (invisible) and <code>1</code> (fully
								opaque).
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  opacity={0.9}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  opacity={0.9}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="photos">
							<p>
								The photos to display. Accepts a single URL string, a single{' '}
								<a
									href="#photo-props"
									className="font-medium underline underline-offset-2"
								>
									photo object
								</a>
								, or an array of either — including mixed arrays.
							</p>
							<CodeBlock
								__raw__={`// Single URL
<ReactBnbGallery show={open} photos="https://example.com/photo.jpg" onClose={() => setOpen(false)} />

// Array of URLs
<ReactBnbGallery
  show={open}
  photos={[
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
  ]}
  onClose={() => setOpen(false)}
/>

// Array of photo objects
<ReactBnbGallery
  show={open}
  photos={[
    {
      photo: 'https://example.com/photo1.jpg',
      thumbnail: 'https://example.com/photo1-thumb.jpg',
      caption: 'Mountain sunrise',
    },
  ]}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`// Single URL
<ReactBnbGallery show={open} photos="https://example.com/photo.jpg" onClose={() => setOpen(false)} />

// Array of URLs
<ReactBnbGallery
  show={open}
  photos={[
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
  ]}
  onClose={() => setOpen(false)}
/>

// Array of photo objects
<ReactBnbGallery
  show={open}
  photos={[
    {
      photo: 'https://example.com/photo1.jpg',
      thumbnail: 'https://example.com/photo1-thumb.jpg',
      caption: 'Mountain sunrise',
    },
  ]}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="phrases">
							<p>
								Overrides the built-in UI strings. Useful for
								internationalization. Pass only the keys you want to override —
								the rest fall back to defaults.
							</p>
							<CodeBlock
								__raw__={`// Default phrases (for reference):
// {
//   noPhotosProvided: 'No photos to show',
//   showPhotoList: 'Show photo list',
//   hidePhotoList: 'Hide photo list',
// }

<ReactBnbGallery
  show={open}
  photos={photos}
  phrases={{
    noPhotosProvided: 'No hay fotos disponibles',
    showPhotoList: 'Mostrar lista',
    hidePhotoList: 'Ocultar lista',
  }}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`// Default phrases (for reference):
// {
//   noPhotosProvided: 'No photos to show',
//   showPhotoList: 'Show photo list',
//   hidePhotoList: 'Hide photo list',
// }

<ReactBnbGallery
  show={open}
  photos={photos}
  phrases={{
    noPhotosProvided: 'No hay fotos disponibles',
    showPhotoList: 'Mostrar lista',
    hidePhotoList: 'Ocultar lista',
  }}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="preloadSize">
							<p>
								The number of photos to preload when the gallery opens.
								Increasing this value improves perceived performance when
								navigating quickly, at the cost of extra network requests.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  preloadSize={10}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  preloadSize={10}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="prevButtonPressed">
							<p>
								Callback fired when the previous <code>←</code> control button
								is clicked.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  prevButtonPressed={() => console.log('Prev clicked')}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  prevButtonPressed={() => console.log('Prev clicked')}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="rightKeyPressed">
							<p>Callback fired when the right arrow key is pressed.</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  rightKeyPressed={() => console.log('Right key pressed')}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  rightKeyPressed={() => console.log('Right key pressed')}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="show">
							<p>
								Controls the visibility of the gallery modal. Set to{' '}
								<code>true</code> to open and <code>false</code> to close. Pair
								this with <code>onClose</code> to keep state in sync.
							</p>
							<CodeBlock
								__raw__={`const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open gallery</button>
  <ReactBnbGallery
    show={open}
    photos={photos}
    onClose={() => setOpen(false)}
  />
</>`}
							>
								<pre>
									<code>{`const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open gallery</button>
  <ReactBnbGallery
    show={open}
    photos={photos}
    onClose={() => setOpen(false)}
  />
</>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="showThumbnails">
							<p>
								When <code>true</code>, a strip of thumbnail images is displayed
								at the bottom of the gallery for quick navigation. Set to{' '}
								<code>false</code> to hide it.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  showThumbnails={false}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  showThumbnails={false}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="wrap">
							<p>
								When <code>true</code>, navigating past the last photo loops
								back to the first, and vice versa. When <code>false</code>,
								navigation stops at the boundaries.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  wrap
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  wrap
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="zIndex">
							<p>
								Sets the CSS <code>z-index</code> of the gallery modal. Increase
								this value if the gallery appears behind other positioned
								elements in your layout.
							</p>
							<CodeBlock
								__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  zIndex={9999}
  onClose={() => setOpen(false)}
/>`}
							>
								<pre>
									<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  zIndex={9999}
  onClose={() => setOpen(false)}
/>`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>
					</div>
				</div>

				{/* Photo props */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h2
							id="photo-props"
							className="scroll-m-24 text-lg font-semibold tracking-tight"
						>
							Photo props
						</h2>
						<p className="text-sm text-muted-foreground">
							These props are passed as objects inside the <code>photos</code>{' '}
							array of <code>ReactBnbGallery</code>.
						</p>
						<PropsTable rows={photoProps} />
					</div>

					<div className="flex flex-col gap-8">
						<PropDetail name="photo">
							<p>
								The URL of the full-resolution image to display in the gallery
								viewer. This is the only required field in a photo object.
							</p>
							<CodeBlock
								__raw__={`photos={[
  { photo: 'https://example.com/photo.jpg' },
]}`}
							>
								<pre>
									<code>{`photos={[
  { photo: 'https://example.com/photo.jpg' },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="number">
							<p>
								An optional number displayed alongside the photo. Useful for
								showing a custom index or identifier instead of the
								auto-generated position.
							</p>
							<CodeBlock
								__raw__={`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    number: 1,
  },
]}`}
							>
								<pre>
									<code>{`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    number: 1,
  },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="caption">
							<p>
								The main caption content shown below the photo. Accepts plain
								text or custom React content.
							</p>
							<CodeBlock
								__raw__={`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    caption: (
      <span>
        Mountain sunrise in the Alps by{' '}
        <a href="https://example.com/jane-doe">Jane Doe</a>
      </span>
    ),
  },
]}`}
							>
								<pre>
									<code>{`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    caption: (
      <span>
        Mountain sunrise in the Alps by{' '}
        <a href="https://example.com/jane-doe">Jane Doe</a>
      </span>
    ),
  },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="alt">
							<p>
								Accessible text for the full-size image. When omitted, the
								component falls back to <code>caption</code>.
							</p>
							<CodeBlock
								__raw__={`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    alt: 'Mountain sunrise over a snowy ridge',
    caption: 'Mountain sunrise in the Alps',
  },
]}`}
							>
								<pre>
									<code>{`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    alt: 'Mountain sunrise over a snowy ridge',
    caption: 'Mountain sunrise in the Alps',
  },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="thumbnailAlt">
							<p>
								Accessible text for the thumbnail image. When omitted, it
								falls back to <code>alt</code>, then <code>caption</code>.
							</p>
							<CodeBlock
								__raw__={`photos={[
  {
    photo: 'https://example.com/photo-large.jpg',
    thumbnail: 'https://example.com/photo-thumb.jpg',
    alt: 'Mountain sunrise over a snowy ridge',
    thumbnailAlt: 'Thumbnail preview of mountain sunrise',
    caption: 'Mountain sunrise in the Alps',
  },
]}`}
							>
								<pre>
									<code>{`photos={[
  {
    photo: 'https://example.com/photo-large.jpg',
    thumbnail: 'https://example.com/photo-thumb.jpg',
    alt: 'Mountain sunrise over a snowy ridge',
    thumbnailAlt: 'Thumbnail preview of mountain sunrise',
    caption: 'Mountain sunrise in the Alps',
  },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="subcaption">
							<p>
								A secondary line rendered below the caption. Accepts plain text
								or React content.
							</p>
							<CodeBlock
								__raw__={`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    caption: 'Mountain sunrise in the Alps',
    subcaption: (
      <span>
        Photo by <strong>Jane Doe</strong> · Zermatt, Switzerland
      </span>
    ),
  },
]}`}
							>
								<pre>
									<code>{`photos={[
  {
    photo: 'https://example.com/photo.jpg',
    caption: 'Mountain sunrise in the Alps',
    subcaption: (
      <span>
        Photo by <strong>Jane Doe</strong> · Zermatt, Switzerland
      </span>
    ),
  },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>

						<PropDetail name="thumbnail">
							<p>
								The URL of a smaller version of the photo used in the thumbnail
								strip. The recommended size is <code>58×50</code> pixels. If
								omitted, the full <code>photo</code> URL is used as a fallback,
								which may affect performance for large images.
							</p>
							<CodeBlock
								__raw__={`photos={[
  {
    photo: 'https://example.com/photo-large.jpg',
    thumbnail: 'https://example.com/photo-thumb.jpg',
  },
]}`}
							>
								<pre>
									<code>{`photos={[
  {
    photo: 'https://example.com/photo-large.jpg',
    thumbnail: 'https://example.com/photo-thumb.jpg',
  },
]}`}</code>
								</pre>
							</CodeBlock>
						</PropDetail>
					</div>
				</div>
			</div>
		</DocsPage>
	);
}
