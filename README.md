# react-bnb-gallery

> Simple photo gallery based on React and Airbnb image gallery

[![NPM](https://img.shields.io/npm/v/react-bnb-gallery.svg)](https://www.npmjs.com/package/react-bnb-gallery) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-bnb-gallery
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactBnbGallery from 'react-bnb-gallery'

class Example extends Component {
  render () {
    return (
      <ReactBnbGallery show photos=[{
        {
          photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
          caption: "Viñales, Pinar del Río, Cuba",
          subcaption: "Photo by Simon Matzinger on Unsplash",
          thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
        },
        {
          photo: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
          caption: "La Habana, Cuba",
          subcaption: "Photo by Gerardo Sanchez on Unsplash",
          thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
        },
        {
          photo: "https://source.unsplash.com/QdBHnkBdu4g/1144x763",
          caption: "Woman smoking a tobacco",
          subcaption: "Photo by Hannah Cauhepe on Unsplash",
          thumbnail: "https://source.unsplash.com/QdBHnkBdu4g/100x67",
        }
      }] />
    )
  }
}
```

## License

MIT © [Pedro Enrique Palau](https://github.com/peterpalau)
"# react-bnb-gallery" 
