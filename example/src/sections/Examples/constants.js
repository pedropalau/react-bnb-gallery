import SpanishPhrases from './localization/es';

const NO_TITLE = '-';

export const DEMO_PHOTOS = {
  earth: [{
    photo: 'https://source.unsplash.com/iQRKBNKyRpo',
    caption: "Teutoburg Forest, Germany",
    subcaption: "Philipp Pilz",
    thumbnail: "https://source.unsplash.com/iQRKBNKyRpo/100x67",
  }, {
    photo: 'https://source.unsplash.com/M-rww53f9A0',
    caption: "La Palma, Spain",
    subcaption: "Evgeni Tcherkasski",
    thumbnail: "https://source.unsplash.com/M-rww53f9A0/100x67",
  }, {
    photo: 'https://source.unsplash.com/9QF90iLO0q0',
    caption: "Planet Earth",
    subcaption: "Joshua Fuller",
    thumbnail: "https://source.unsplash.com/9QF90iLO0q0/100x67",
  }, {
    photo: 'https://source.unsplash.com/6xn0wsneuY8',
    caption: "White Sands National Monument, United States",
    subcaption: "Ben Klea",
    thumbnail: "https://source.unsplash.com/6xn0wsneuY8/100x67",
  }, {
    photo: 'https://source.unsplash.com/UYpsXT7lpyc',
    caption: "Unnamed Road, Obukhivs'kyi district, Ukraine",
    subcaption: "Anton Sharov",
    thumbnail: "https://source.unsplash.com/UYpsXT7lpyc/100x67",
  }, {
    photo: 'https://source.unsplash.com/mFJu6intdkQ',
    caption: "Conversations With Shadows, Cheddar Gorge, England",
    subcaption: "Rob Potter",
    thumbnail: "https://source.unsplash.com/mFJu6intdkQ/100x67",
  }, {
    photo: 'https://source.unsplash.com/7cAiUMWPjnY',
    caption: "Mývatn, Iceland",
    subcaption: "Joshua Earle",
    thumbnail: "https://source.unsplash.com/7cAiUMWPjnY/100x67",
  }, {
    photo: 'https://source.unsplash.com/IHGievc9q70',
    caption: "Latvia",
    subcaption: "Ralph Blvmberg",
    thumbnail: "https://source.unsplash.com/IHGievc9q70/100x67",
  }, {
    photo: 'https://source.unsplash.com/VivzPEYabew',
    caption: NO_TITLE,
    subcaption: "Jez Timms",
    thumbnail: "https://source.unsplash.com/VivzPEYabew/100x67",
  }, {
    photo: 'https://source.unsplash.com/nCQeEV8npmE',
    caption: "Keyhole Arch, Big Sur, CA, USA",
    subcaption: "Aaron Roth",
    thumbnail: "https://source.unsplash.com/nCQeEV8npmE/100x67",
  }],
  entrepreneur: [{
    photo: 'https://source.unsplash.com/R3VGPOttrNc',
    caption: "Frakcia, Kazan, Russia",
    subcaption: "Rashid Sadykov",
    thumbnail: "https://source.unsplash.com/R3VGPOttrNc/100x67",
  }, {
    photo: 'https://source.unsplash.com/wdrvmCAJqW4',
    caption: NO_TITLE,
    subcaption: "Thit Htoo Zaw",
    thumbnail: "https://source.unsplash.com/wdrvmCAJqW4/100x67",
  }, {
    photo: 'https://source.unsplash.com/4Yv84VgQkRM',
    caption: "Lagos, Nigeria",
    subcaption: "Prince Akachi",
    thumbnail: "https://source.unsplash.com/4Yv84VgQkRM/100x67",
  }, {
    photo: 'https://source.unsplash.com/WWk2icWFJtk',
    caption: "Sydney, Australia",
    subcaption: "Simon Rae",
    thumbnail: "https://source.unsplash.com/WWk2icWFJtk/100x67",
  }, {
    photo: 'https://source.unsplash.com/XkKCui44iM0',
    caption: NO_TITLE,
    subcaption: "Priscilla Du Preez",
    thumbnail: "https://source.unsplash.com/XkKCui44iM0/100x67",
  }, {
    photo: 'https://source.unsplash.com/RZdPw7eIkdk',
    caption: NO_TITLE,
    subcaption: "Zhu Hongzhi",
    thumbnail: "https://source.unsplash.com/RZdPw7eIkdk/100x67",
  }, {
    photo: 'https://source.unsplash.com/F5ae6ys2Mp8',
    caption: "Sydney, Australia",
    subcaption: "Trent Szmolnik",
    thumbnail: "https://source.unsplash.com/F5ae6ys2Mp8/100x67",
  }, {
    photo: 'https://source.unsplash.com/-WBYxmW4yuw',
    caption: "Timișoara, Romania",
    subcaption: "Alexandru Acea",
    thumbnail: "https://source.unsplash.com/-WBYxmW4yuw/100x67",
  }, {
    photo: 'https://source.unsplash.com/_y0tTb95xeY',
    caption: NO_TITLE,
    subcaption: "Julian Christian Anderson",
    thumbnail: "https://source.unsplash.com/_y0tTb95xeY/100x67",
  }, {
    photo: 'https://source.unsplash.com/C_L61Njf3do',
    caption: NO_TITLE,
    subcaption: "Kevin Bhagat",
    thumbnail: "https://source.unsplash.com/C_L61Njf3do/100x67",
  }]
};

export const DEMOS = [{
  name: 'no-configuration',
  label: 'Default props',
  description: null,
  config: {
    photos: DEMO_PHOTOS.earth,
  },
  code: `
    {
      // This prop is required
      photos: [{
        photo: ...,
        caption: ...,
        subcaption: ...,
        thumbnail: ...,
      }],
    }
  `,
}, {
  name: 'localization',
  label: 'Localization (Spanish)',
  description: null,
  config: {
    photos: DEMO_PHOTOS.entrepreneur,
    phrases: SpanishPhrases,
    showThumbnails: true,
  },
  code: `
    {
      photos: [...],
      // More phrases comming...
      phrases: {
        noPhotosProvided: ...,
        showPhotoList: ...,
        hidePhotoList: ...,
      }
    }
  `,
}, {
  name: 'wrap',
  label: 'Wrap',
  description: null,
  config: {
    photos: DEMO_PHOTOS.earth,
    wrap: true,
  },
  code: `
    {
      photos: [...],
      // Set to false, if you
      // want an infinity slideshow
      wrap: true,
    }
  `,
}, {
  name: 'keyboard',
  label: 'Keyboard navigation',
  description: null,
  config: {
    photos: DEMO_PHOTOS.earth,
    keyboard: true,
  },
  code: `
    {
      photos: [...],
      // The keyboard navigation
      // uses <Left>, <Right> and <Esc>
      keyboard: true,
    }
  `,
}, {
  name: 'no-thumbnails',
  label: 'No thumbnails',
  description: null,
  config: {
    photos: DEMO_PHOTOS.earth,
    showThumbnails: false,
  },
  code: `
    {
      photos: [...],
      // When is false, the thumbnails
      // and caption are hidden
      showThumbnails: false,
    }
  `,
}, {
  name: 'callbacks',
  label: 'Callbacks',
  description: null,
  config: {
    photos: DEMO_PHOTOS.earth,
    activePhotoPressed: () => {},
    leftKeyPressed: () => {},
    nextButtonPressed: () => {},
    prevButtonPressed: () => {},
    rightKeyPressed: () => {},
  },
  code: `
    {
      photos: [...],
      // Current photo clicked
      activePhotoPressed: () => {},
      // <Left> key pressed
      leftKeyPressed: () => {},
      nextButtonPressed: () => {},
      // For closing the gallery
      onClose: () => {},
      prevButtonPressed: () => {},
      // <Right> key pressed
      rightKeyPressed: () => {},
    }
  `,
}];
