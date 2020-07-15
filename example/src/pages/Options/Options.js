import React from 'react';

import Anchor from '../../components/Anchor';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Text from '../../components/Text';
import Title from '../../components/Title';

import withPrism from '../../utils/withPrism';

const Options = () => (
  <Container className="container">
    <Heading>Available options</Heading>
    <Text inherit>You can set the following properties.</Text>
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Default</th>
            <th align="left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">
              <code className="prop">activePhotoIndex</code>
            </td>
            <td align="left"><code className="data-type">number</code></td>
            <td align="left"><code>0</code></td>
            <td align="left">Initial photo index to show.</td>
          </tr>
          <tr>
            <td align="left"><code>activePhotoPressed</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Called when a photo is pressed.</td>
          </tr>
          <tr>
            <td align="left"><code>leftKeyPressed</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Called when <code>left</code> key of the keyboard is pressed.</td>
          </tr>
          <tr>
            <td align="left"><code>nextButtonPressed</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Called when <code>next</code> control button is pressed.</td>
          </tr>
          <tr>
            <td align="left"><code>onClose</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Called when the gallery modal is going to close.</td>
          </tr>
          <tr>
            <td align="left"><code>preloadSize</code></td>
            <td align="left"><code className="data-type">number</code></td>
            <td align="left"><code>5</code></td>
            <td align="left">The number of photos to preload on gallery initialization.</td>
          </tr>
          <tr>
            <td align="left"><code>prevButtonPressed</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Called when <code>previous</code> control button is pressed.</td>
          </tr>
          <tr>
            <td align="left"><code>photos</code></td>
            <td align="left"><code className="data-type">array</code></td>
            <td align="left"><code>[]</code></td>
            <td align="left">Array of photos. It can be an <code>array</code> of photos <code>URLs</code> or an <code>array</code> of <code>objects</code>. See the <code>[photo object]</code> props <a href="#photos-properties">bellow</a>.</td>
          </tr>
          <tr>
            <td align="left"><code>phrases</code></td>
            <td align="left"><code className="data-type">object</code></td>
            <td align="left"><code>defaultPhrases</code></td>
            <td align="left"><code>...</code></td>
          </tr>
          <tr>
            <td align="left"><code>rightKeyPressed</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Called when <code>right</code> key of the keyboard is pressed.</td>
          </tr>
          <tr>
            <td align="left"><code>show</code></td>
            <td align="left"><code className="data-type">function</code></td>
            <td align="left"><code>noop</code></td>
            <td align="left">Shows the modal when initialized.</td>
          </tr>
          <tr>
            <td align="left"><code>showThumbnails</code></td>
            <td align="left"><code className="data-type">boolean</code></td>
            <td align="left"><code>true</code></td>
            <td align="left">Whether the gallery should show thumbnails.</td>
          </tr>
          <tr>
            <td align="left"><code>keyboard</code></td>
            <td align="left"><code className="data-type">boolean</code></td>
            <td align="left"><code>true</code></td>
            <td align="left">Whether the gallery should react to keyboard events.</td>
          </tr>
          <tr>
            <td align="left"><code>wrap</code></td>
            <td align="left"><code className="data-type">boolean</code></td>
            <td align="left"><code>false</code></td>
            <td align="left">Whether the gallery should cycle continuously or have hard stops.</td>
          </tr>
          <tr>
            <td align="left"><code>opacity</code></td>
            <td align="left"><code className="data-type">number</code></td>
            <td align="left"><code>1</code></td>
            <td align="left">Sets the opacity level for the component.</td>
          </tr>
          <tr>
            <td align="left"><code>backgroundColor</code></td>
            <td align="left"><code className="data-type">string</code></td>
            <td align="left"><code>#000000</code></td>
            <td align="left">Sets the background color of the gallery component.</td>
          </tr>
          <tr>
            <td align="left"><code>zIndex</code></td>
            <td align="left"><code className="data-type">number</code></td>
            <td align="left"><code>2000</code></td>
            <td align="left">Specifies the stack order of the component.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Title level={3}>
      <Anchor id="photos-properties" />
      Photos array item properties
    </Title>
    <Text inherit>This props are passed into ReactBnbGallery's <code>photos</code> property</Text>
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Default</th>
            <th align="left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">photo</td>
            <td align="left"><code className="data-type">string</code></td>
            <td align="left"><code>undefined</code></td>
            <td align="left">The <code>src</code> attribute value of the image.</td>
          </tr>
          <tr>
            <td align="left">number</td>
            <td align="left"><code className="data-type">number</code></td>
            <td align="left"><code>undefined</code></td>
            <td align="left">The current number of the photo.</td>
          </tr>
          <tr>
            <td align="left">caption</td>
            <td align="left"><code className="data-type">string</code></td>
            <td align="left"><code>undefined</code></td>
            <td align="left">Photo description.</td>
          </tr>
          <tr>
            <td align="left">subcaption</td>
            <td align="left"><code className="data-type">string</code></td>
            <td align="left"><code>undefined</code></td>
            <td align="left">Photo secondary description, like the photo author or the name of the place where it was taken.</td>
          </tr>
          <tr>
            <td align="left">thumbnail</td>
            <td align="left"><code className="data-type">string</code></td>
            <td align="left"><code>undefined</code></td>
            <td align="left">The <code>url</code> of the photo thumbnail. The preferred size for each thumbnail is <code>100x67</code>.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Container>
);

export default withPrism(Options);
