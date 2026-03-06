import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';
import { DocsPage, DocsPageHeading2, DocsPageParagraph } from '@/components/docs-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('Theming');

export default function ThemingPage() {
	return (
		<DocsPage
			title="Theming"
			description="Customize react-bnb-gallery with class names, inline styles, or full component slot overrides."
			path="theming"
		>
			<DocsPageParagraph>
				You now have three customization levels:
			</DocsPageParagraph>
			<ul className="list-disc space-y-2 pl-5 text-base">
				<li>
					<code>classNames</code>: attach your own CSS/Tailwind classes to built-in slots.
				</li>
				<li>
					<code>styles</code>: apply inline style objects to those same slots.
				</li>
				<li>
					<code>components</code>: replace internal UI pieces with custom React components.
				</li>
			</ul>

			<DocsPageHeading2>Quick Theming</DocsPageHeading2>
			<DocsPageParagraph>
				Use <code>classNames</code> and <code>styles</code> when you want to keep built-in behavior and only adjust presentation.
			</DocsPageParagraph>
			<CodeBlock
				__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  classNames={{
    overlay: 'bg-slate-950/90 backdrop-blur-md',
    caption: 'bg-slate-950/75',
    togglePhotoList: 'text-sky-300 hover:text-sky-200',
    thumbnailButton: 'rounded border border-white/30',
  }}
  styles={{
    photoCounter: { fontVariantNumeric: 'tabular-nums' },
    caption: { borderTop: '1px solid rgba(255,255,255,0.2)' },
  }}
  onClose={() => setOpen(false)}
/>`}
			>
				<pre>
					<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  classNames={{
    overlay: 'bg-slate-950/90 backdrop-blur-md',
    caption: 'bg-slate-950/75',
    togglePhotoList: 'text-sky-300 hover:text-sky-200',
    thumbnailButton: 'rounded border border-white/30',
  }}
  styles={{
    photoCounter: { fontVariantNumeric: 'tabular-nums' },
    caption: { borderTop: '1px solid rgba(255,255,255,0.2)' },
  }}
  onClose={() => setOpen(false)}
/>`}</code>
				</pre>
			</CodeBlock>

			<DocsPageHeading2>Custom Component Slots</DocsPageHeading2>
			<DocsPageParagraph>
				Use <code>components</code> when design requirements need custom markup or your own design-system primitives. You can now override top-level layout slots such as <code>Overlay</code>, <code>PhotoCounter</code>, and <code>ModalContainer</code> in addition to button/photo/caption slots.
			</DocsPageParagraph>
			<CodeBlock
				__raw__={`<ReactBnbGallery
  show={open}
  photos={photos}
  components={{
    ModalContainer: ({ children, className }) => (
      <section className={\`my-gallery-shell \${className ?? ''}\`}>
        {children}
      </section>
    ),
    PhotoCounter: ({ current, total, className }) => (
      <div className={className}>Photo {current} of {total}</div>
    ),
    CloseButton: ({ onPress, className }) => (
      <button
        type="button"
        className={\`btn btn-ghost \${className ?? ''}\`}
        onClick={onPress}
      >
        Dismiss
      </button>
    ),
    NextButton: ({ onPress, disabled, className }) => (
      <button
        type="button"
        disabled={disabled}
        className={\`btn btn-secondary \${className ?? ''}\`}
        onClick={onPress}
      >
        Next
      </button>
    ),
  }}
  onClose={() => setOpen(false)}
/>`}
			>
				<pre>
					<code>{`<ReactBnbGallery
  show={open}
  photos={photos}
  components={{
    ModalContainer: ({ children, className }) => (
      <section className={\`my-gallery-shell \${className ?? ''}\`}>
        {children}
      </section>
    ),
    PhotoCounter: ({ current, total, className }) => (
      <div className={className}>Photo {current} of {total}</div>
    ),
    CloseButton: ({ onPress, className }) => (
      <button
        type="button"
        className={\`btn btn-ghost \${className ?? ''}\`}
        onClick={onPress}
      >
        Dismiss
      </button>
    ),
    NextButton: ({ onPress, disabled, className }) => (
      <button
        type="button"
        disabled={disabled}
        className={\`btn btn-secondary \${className ?? ''}\`}
        onClick={onPress}
      >
        Next
      </button>
    ),
  }}
  onClose={() => setOpen(false)}
/>`}</code>
				</pre>
			</CodeBlock>

			<DocsPageParagraph>
				For full prop signatures and slot names, see the <Link href="/docs/options">options reference</Link>.
			</DocsPageParagraph>
		</DocsPage>
	);
}
