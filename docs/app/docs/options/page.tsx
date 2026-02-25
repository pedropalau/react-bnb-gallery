import DocsPage from '../../../components/docs-page';
import { createPageMetadata } from '../../../lib/metadata';

export const metadata = createPageMetadata('Options');

export default function OptionsPage() {
  return (
    <DocsPage title="Options" path="options">
      <p>To customize <strong>bnbgallery</strong> you can use the following properties:</p>

      <h3><code>activePhotoIndex</code></h3>
      <p><code>activePhotoIndex: number</code></p>
      <p>Initial photo index to show. Defaults to <code>0</code>.</p>

      <h3><code>activePhotoPressed</code></h3>
      <p><code>activePhotoPressed: function</code></p>
      <p>Called when a photo is pressed. Defaults to <code>noop</code>.</p>

      <h3><code>leftKeyPressed</code></h3>
      <p><code>leftKeyPressed: function</code></p>
      <p>Called when left key of the keyboard is pressed. Defaults to <code>noop</code>.</p>

      <h3><code>nextButtonPressed</code></h3>
      <p><code>nextButtonPressed: function</code></p>
      <p>Called when next control button is pressed. Defaults to <code>noop</code>.</p>

      <h3><code>onClose</code></h3>
      <p><code>onClose: function</code></p>
      <p>Called when the gallery modal is going to close. Defaults to <code>noop</code>.</p>

      <h3><code>preloadSize</code></h3>
      <p><code>preloadSize: number</code></p>
      <p>The number of photos to preload on gallery initialization. Defaults to <code>5</code>.</p>

      <h3><code>prevButtonPressed</code></h3>
      <p><code>prevButtonPressed: function</code></p>
      <p>Called when previous control button is pressed. Defaults to <code>noop</code>.</p>

      <h3><code>photos</code></h3>
      <p><code>photos: array</code></p>
      <p>List of photos. It can be an array of photos URLs or an array of objects. See the photo object props below.</p>

      <h3><code>phrases</code></h3>
      <p><code>phrases: object</code></p>
      <p>List of phrases. Could be used to translate strings. Defaults to <code>{'{...}'}</code>.</p>

      <h3><code>rightKeyPressed</code></h3>
      <p><code>rightKeyPressed: function</code></p>
      <p>Called when right key of the keyboard is pressed. Defaults to <code>noop</code>.</p>

      <h3><code>show</code></h3>
      <p><code>show: function</code></p>
      <p>Shows the modal when initialized. Defaults to <code>noop</code>.</p>

      <h3><code>showThumbnails</code></h3>
      <p><code>showThumbnails: boolean</code></p>
      <p>Whether the gallery should show thumbnails. Defaults to <code>true</code>.</p>

      <h3><code>keyboard</code></h3>
      <p><code>keyboard: boolean</code></p>
      <p>Whether the gallery should react to keyboard events. Defaults to <code>true</code>.</p>

      <h3><code>wrap</code></h3>
      <p><code>wrap: boolean</code></p>
      <p>Whether the gallery should cycle continuously or have hard stops. Defaults to <code>false</code>.</p>

      <h3><code>opacity</code></h3>
      <p><code>opacity: number</code></p>
      <p>Sets the opacity level for the component. Defaults to <code>1</code>.</p>

      <h3><code>backgroundColor</code></h3>
      <p><code>backgroundColor: string</code></p>
      <p>Sets the background color of the gallery component. Defaults to <code>#000000</code>.</p>

      <h3><code>zIndex</code></h3>
      <p><code>zIndex: number</code></p>
      <p>Specifies the stack order of the component. Defaults to <code>2000</code>.</p>

      <h2>Photo properties</h2>
      <p>This props are passed into <code>ReactBnbGallery</code>&apos;s photos property:</p>

      <h3><code>photo</code></h3>
      <p><code>photo: string</code></p>
      <p>The src attribute value of the image. Defaults to <code>undefined</code>.</p>

      <h3><code>number</code></h3>
      <p><code>number: string</code></p>
      <p>The current number of the photo. Defaults to <code>undefined</code>.</p>

      <h3><code>caption</code></h3>
      <p><code>caption: string</code></p>
      <p>Photo description. Defaults to <code>undefined</code>.</p>

      <h3><code>subcaption</code></h3>
      <p><code>subcaption: string</code></p>
      <p>Photo secondary description, like the photo author or place name. Defaults to <code>undefined</code>.</p>

      <h3><code>thumbnail</code></h3>
      <p><code>thumbnail: string</code></p>
      <p>The URL of the photo thumbnail. Preferred size is <code>100x67</code>. Defaults to <code>undefined</code>.</p>
    </DocsPage>
  );
}
